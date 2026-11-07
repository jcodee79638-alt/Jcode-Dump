using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;

namespace JacCodeSetup;

internal static class ShellShortcut
{
	private struct PropertyKey
	{
		internal Guid Format;

		internal uint ID;
	}

	[StructLayout(LayoutKind.Explicit, Size = 24)]
	private struct PropVariant
	{
		[FieldOffset(0)]
		internal ushort Type;

		[FieldOffset(8)]
		internal IntPtr Pointer;
	}

	[ComImport]
	[Guid("886D8EEB-8CF2-4446-8D02-CDBA1DBDCF99")]
	[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
	private interface IPropertyStore
	{
		[PreserveSig]
		int GetCount(out uint count);

		[PreserveSig]
		int GetAt(uint index, out PropertyKey key);

		[PreserveSig]
		int GetValue(ref PropertyKey key, out PropVariant value);

		[PreserveSig]
		int SetValue(ref PropertyKey key, ref PropVariant value);

		[PreserveSig]
		int Commit();
	}

	internal const string AppID = "JacCode.Desktop";

	private static readonly Guid AppProperties = new Guid("9F4C2855-9F79-4B39-A8D0-E1D42DE1D5F3");

	internal static T Link<T>(string filename, Func<Type, object, T> action)
	{
		Type typeFromProgID = Type.GetTypeFromProgID("WScript.Shell", throwOnError: true);
		object obj = Activator.CreateInstance(typeFromProgID);
		object obj2 = null;
		try
		{
			obj2 = typeFromProgID.InvokeMember("CreateShortcut", BindingFlags.InvokeMethod, null, obj, new object[1] { filename });
			return action(obj2.GetType(), obj2);
		}
		finally
		{
			if (obj2 != null)
			{
				Marshal.FinalReleaseComObject(obj2);
			}
			Marshal.FinalReleaseComObject(obj);
		}
	}

	internal static string Target(string filename)
	{
		return Link(filename, (Type type, object shortcut) => (string)type.InvokeMember("TargetPath", BindingFlags.GetProperty, null, shortcut, null));
	}

	internal static bool Brand(string directory, string filename, bool create)
	{
		bool flag = Link(filename, delegate(Type type, object shortcut)
		{
			Dictionary<string, string> dictionary = new Dictionary<string, string>
			{
				{
					"TargetPath",
					Path.Combine(directory, "jac.exe")
				},
				{
					"IconLocation",
					Path.Combine(directory, "jac.ico") + ",0"
				}
			};
			if (create)
			{
				if (!File.Exists(filename))
				{
					dictionary.Add("Arguments", "--home");
					dictionary.Add("WorkingDirectory", Environment.GetFolderPath(Environment.SpecialFolder.UserProfile));
				}
				dictionary.Add("Description", "Jac Code");
			}
			bool flag2 = false;
			foreach (KeyValuePair<string, string> item in dictionary)
			{
				if (!object.Equals(type.InvokeMember(item.Key, BindingFlags.GetProperty, null, shortcut, null), item.Value))
				{
					type.InvokeMember(item.Key, BindingFlags.SetProperty, null, shortcut, new object[1] { item.Value });
					flag2 = true;
				}
			}
			if (flag2 || !File.Exists(filename))
			{
				type.InvokeMember("Save", BindingFlags.InvokeMethod, null, shortcut, null);
			}
			return flag2;
		});
		if (Identity(filename, directory))
		{
			flag = true;
		}
		if (flag)
		{
			SHChangeNotify(8192u, 5u, filename, IntPtr.Zero);
		}
		return flag;
	}

	private static bool Identity(string filename, string directory)
	{
		Dictionary<uint, string> dictionary = new Dictionary<uint, string>();
		dictionary.Add(2u, "\"" + Path.Combine(directory, "jac.exe") + "\" --home");
		dictionary.Add(3u, Path.Combine(directory, "jac.ico") + ",0");
		dictionary.Add(4u, "Jac Code");
		dictionary.Add(5u, "JacCode.Desktop");
		Dictionary<uint, string> dictionary2 = dictionary;
		IPropertyStore propertyStore = Store(filename);
		try
		{
			bool flag = false;
			foreach (KeyValuePair<uint, string> item in dictionary2)
			{
				PropertyKey key = new PropertyKey
				{
					Format = AppProperties,
					ID = item.Key
				};
				if (!(Read(propertyStore, key) == item.Value))
				{
					PropVariant value = new PropVariant
					{
						Type = 31,
						Pointer = Marshal.StringToCoTaskMemUni(item.Value)
					};
					try
					{
						Marshal.ThrowExceptionForHR(propertyStore.SetValue(ref key, ref value));
					}
					finally
					{
						PropVariantClear(ref value);
					}
					flag = true;
				}
			}
			if (flag)
			{
				Marshal.ThrowExceptionForHR(propertyStore.Commit());
			}
			return flag;
		}
		finally
		{
			Marshal.FinalReleaseComObject(propertyStore);
		}
	}

	private static string Read(IPropertyStore store, PropertyKey key)
	{
		Marshal.ThrowExceptionForHR(store.GetValue(ref key, out var value));
		try
		{
			return (value.Type == 31) ? Marshal.PtrToStringUni(value.Pointer) : "";
		}
		finally
		{
			PropVariantClear(ref value);
		}
	}

	private static IPropertyStore Store(string filename)
	{
		Guid iid = typeof(IPropertyStore).GUID;
		Marshal.ThrowExceptionForHR(SHGetPropertyStoreFromParsingName(filename, IntPtr.Zero, 2u, ref iid, out var store));
		return store;
	}

	[DllImport("shell32.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
	private static extern int SHGetPropertyStoreFromParsingName(string path, IntPtr context, uint flags, ref Guid iid, out IPropertyStore store);

	[DllImport("ole32.dll")]
	private static extern int PropVariantClear(ref PropVariant value);

	[DllImport("shell32.dll", CharSet = CharSet.Unicode)]
	private static extern void SHChangeNotify(uint change, uint flags, string item, IntPtr other);
}
