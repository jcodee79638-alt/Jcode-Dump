using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

internal static class ProjectRun
{
	private struct SecurityAttributes
	{
		public int Length;

		public IntPtr Descriptor;

		[MarshalAs(UnmanagedType.Bool)]
		public bool Inherit;
	}

	[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
	private struct StartupInfo
	{
		public int Size;

		public string Reserved;

		public string Desktop;

		public string Title;

		public uint X;

		public uint Y;

		public uint XSize;

		public uint YSize;

		public uint XCountChars;

		public uint YCountChars;

		public uint FillAttribute;

		public uint Flags;

		public ushort ShowWindow;

		public ushort ReservedSize;

		public IntPtr ReservedBytes;

		public IntPtr Input;

		public IntPtr Output;

		public IntPtr Error;
	}

	private struct StartupInfoEx
	{
		public StartupInfo Startup;

		public IntPtr Attributes;
	}

	private struct ProcessInformation
	{
		public IntPtr Process;

		public IntPtr Thread;

		public uint ProcessId;

		public uint ThreadId;
	}

	private struct BasicLimits
	{
		public long ProcessTime;

		public long JobTime;

		public uint Flags;

		public UIntPtr MinimumWorkingSet;

		public UIntPtr MaximumWorkingSet;

		public uint ActiveProcesses;

		public UIntPtr Affinity;

		public uint Priority;

		public uint Scheduling;
	}

	private struct IoCounters
	{
		public ulong ReadOperations;

		public ulong WriteOperations;

		public ulong OtherOperations;

		public ulong ReadBytes;

		public ulong WriteBytes;

		public ulong OtherBytes;
	}

	private struct JobLimits
	{
		public BasicLimits Basic;

		public IoCounters Io;

		public UIntPtr ProcessMemory;

		public UIntPtr JobMemory;

		public UIntPtr PeakProcessMemory;

		public UIntPtr PeakJobMemory;
	}

	private struct ProcessBasicInformation
	{
		public IntPtr ExitStatus;

		public IntPtr Peb;

		public IntPtr Affinity;

		public IntPtr Priority;

		public UIntPtr ProcessId;

		public UIntPtr ParentId;
	}

	private sealed class Worker : IDisposable
	{
		private readonly Thread thread;

		private readonly ManualResetEvent started = new ManualResetEvent(initialState: false);

		private IntPtr nativeThread;

		internal Worker(Action action)
		{
			Worker worker = this;
			ThreadStart start = delegate
			{
				worker.nativeThread = OpenThread(1u, inherit: false, GetCurrentThreadId());
				worker.started.Set();
				try
				{
					action();
				}
				catch
				{
				}
			};
			thread = new Thread(start);
			thread.IsBackground = true;
			thread.Start();
			started.WaitOne();
			if (nativeThread == IntPtr.Zero)
			{
				throw new InvalidOperationException();
			}
		}

		internal void Finish()
		{
			if (!thread.Join(2000))
			{
				CancelSynchronousIo(nativeThread);
				thread.Join(2000);
			}
		}

		public void Dispose()
		{
			CancelSynchronousIo(nativeThread);
			thread.Join(2000);
			if (nativeThread != IntPtr.Zero)
			{
				CloseHandle(nativeThread);
			}
			started.Dispose();
		}
	}

	private sealed class Input : IDisposable
	{
		internal readonly ManualResetEvent Ready = new ManualResetEvent(initialState: false);

		internal readonly ManualResetEvent Eof = new ManualResetEvent(initialState: false);

		internal byte[] Line;

		private readonly Worker worker;

		internal Input()
		{
			Action action = delegate
			{
				try
				{
					using MemoryStream memoryStream = new MemoryStream();
					byte[] array = new byte[4096];
					bool flag = false;
					uint read;
					while (ReadFile(GetStdHandle(-10), array, (uint)array.Length, out read, IntPtr.Zero) && read != 0)
					{
						if (!flag)
						{
							for (int i = 0; i < read; i++)
							{
								if (array[i] == 10)
								{
									Line = memoryStream.ToArray();
									flag = true;
									Ready.Set();
									break;
								}
								if (memoryStream.Length >= 98304)
								{
									return;
								}
								memoryStream.WriteByte(array[i]);
							}
						}
					}
				}
				finally
				{
					Ready.Set();
					Eof.Set();
				}
			};
			worker = new Worker(action);
		}

		public void Dispose()
		{
			worker.Dispose();
			Ready.Dispose();
			Eof.Dispose();
		}
	}

	private sealed class Request
	{
		internal int Parent;

		internal string Executable;

		internal string Directory;

		internal readonly List<string> Arguments = new List<string>();
	}

	private sealed class Json
	{
		private readonly string text;

		private int offset;

		internal Json(byte[] bytes)
		{
			text = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false, throwOnInvalidBytes: true).GetString(bytes);
		}

		internal Request Read()
		{
			Request request = new Request();
			HashSet<string> hashSet = new HashSet<string>(StringComparer.Ordinal);
			Require('{');
			do
			{
				string text = String();
				if (!hashSet.Add(text))
				{
					throw new InvalidOperationException();
				}
				Require(':');
				switch (text)
				{
				case "version":
					if (Number() != 1)
					{
						throw new InvalidOperationException();
					}
					break;
				case "parentPid":
					request.Parent = Number();
					break;
				case "executable":
					request.Executable = String();
					break;
				case "cwd":
					request.Directory = String();
					break;
				case "args":
					Require('[');
					if (Take(']'))
					{
						break;
					}
					do
					{
						if (request.Arguments.Count >= 256)
						{
							throw new InvalidOperationException();
						}
						request.Arguments.Add(String());
					}
					while (Take(','));
					Require(']');
					break;
				default:
					throw new InvalidOperationException();
				}
			}
			while (Take(','));
			Require('}');
			White();
			if (offset != this.text.Length || hashSet.Count != 5 || request.Parent <= 0)
			{
				throw new InvalidOperationException();
			}
			return request;
		}

		private void White()
		{
			while (offset < text.Length && (text[offset] == ' ' || text[offset] == '\t' || text[offset] == '\r' || text[offset] == '\n'))
			{
				offset++;
			}
		}

		private bool Take(char token)
		{
			White();
			if (offset >= text.Length || text[offset] != token)
			{
				return false;
			}
			offset++;
			return true;
		}

		private void Require(char token)
		{
			if (!Take(token))
			{
				throw new InvalidOperationException();
			}
		}

		private int Number()
		{
			White();
			int num = offset;
			if (offset < text.Length && text[offset] == '-')
			{
				offset++;
			}
			if (offset >= text.Length || text[offset] < '0' || text[offset] > '9')
			{
				throw new InvalidOperationException();
			}
			if (text[offset++] != '0')
			{
				while (offset < text.Length && text[offset] >= '0' && text[offset] <= '9')
				{
					offset++;
				}
			}
			if (!int.TryParse(text.Substring(num, offset - num), NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out var result))
			{
				throw new InvalidOperationException();
			}
			return result;
		}

		private string String()
		{
			Require('"');
			StringBuilder stringBuilder = new StringBuilder();
			while (offset < text.Length)
			{
				char c = text[offset++];
				if (c == '"')
				{
					return stringBuilder.ToString();
				}
				if (c < ' ')
				{
					throw new InvalidOperationException();
				}
				if (c != '\\')
				{
					stringBuilder.Append(c);
					continue;
				}
				if (offset >= text.Length)
				{
					throw new InvalidOperationException();
				}
				switch (text[offset++])
				{
				case '"':
					stringBuilder.Append('"');
					break;
				case '\\':
					stringBuilder.Append('\\');
					break;
				case '/':
					stringBuilder.Append('/');
					break;
				case 'b':
					stringBuilder.Append('\b');
					break;
				case 'f':
					stringBuilder.Append('\f');
					break;
				case 'n':
					stringBuilder.Append('\n');
					break;
				case 'r':
					stringBuilder.Append('\r');
					break;
				case 't':
					stringBuilder.Append('\t');
					break;
				case 'u':
				{
					if (offset + 4 > text.Length)
					{
						throw new InvalidOperationException();
					}
					if (!ushort.TryParse(text.Substring(offset, 4), NumberStyles.AllowHexSpecifier, CultureInfo.InvariantCulture, out var result))
					{
						throw new InvalidOperationException();
					}
					stringBuilder.Append((char)result);
					offset += 4;
					break;
				}
				default:
					throw new InvalidOperationException();
				}
			}
			throw new InvalidOperationException();
		}
	}

	private const int MaxInput = 98304;

	private const int MaxCommand = 30000;

	private const uint Infinite = uint.MaxValue;

	private static readonly IntPtr InvalidHandle = new IntPtr(-1);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern IntPtr GetStdHandle(int kind);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool ReadFile(IntPtr file, byte[] bytes, uint count, out uint read, IntPtr overlapped);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool WriteFile(IntPtr file, byte[] bytes, uint count, out uint written, IntPtr overlapped);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool CreatePipe(out IntPtr read, out IntPtr write, ref SecurityAttributes attributes, uint size);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool SetHandleInformation(IntPtr handle, uint mask, uint flags);

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern IntPtr CreateFileW(string path, uint access, uint sharing, ref SecurityAttributes attributes, uint disposition, uint flags, IntPtr template);

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern bool CreateProcessW(string application, StringBuilder command, IntPtr processAttributes, IntPtr threadAttributes, bool inherit, uint flags, IntPtr environment, string directory, ref StartupInfoEx startup, out ProcessInformation process);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool InitializeProcThreadAttributeList(IntPtr list, int count, int flags, ref IntPtr bytes);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool UpdateProcThreadAttribute(IntPtr list, uint flags, IntPtr attribute, IntPtr value, IntPtr size, IntPtr previous, IntPtr returned);

	[DllImport("kernel32.dll")]
	private static extern void DeleteProcThreadAttributeList(IntPtr list);

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
	private static extern IntPtr CreateJobObjectW(IntPtr attributes, string name);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool SetInformationJobObject(IntPtr job, int kind, ref JobLimits limits, int size);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool AssignProcessToJobObject(IntPtr job, IntPtr process);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool TerminateJobObject(IntPtr job, uint exitCode);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool TerminateProcess(IntPtr process, uint exitCode);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern uint ResumeThread(IntPtr thread);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool GetExitCodeProcess(IntPtr process, out uint code);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern IntPtr OpenProcess(uint access, bool inherit, int pid);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool GetProcessTimes(IntPtr process, out long created, out long exited, out long kernel, out long user);

	[DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
	private static extern uint GetDriveTypeW(string root);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern IntPtr OpenThread(uint access, bool inherit, uint id);

	[DllImport("kernel32.dll")]
	private static extern uint GetCurrentThreadId();

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool CancelSynchronousIo(IntPtr thread);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern uint WaitForSingleObject(IntPtr handle, uint milliseconds);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern uint WaitForMultipleObjects(uint count, IntPtr[] handles, bool all, uint milliseconds);

	[DllImport("kernel32.dll")]
	private static extern bool CloseHandle(IntPtr handle);

	[DllImport("ntdll.dll")]
	private static extern int NtQueryInformationProcess(IntPtr process, int kind, ref ProcessBasicInformation info, int size, out int returned);

	private static void ValidateText(string value)
	{
		if (value == null || value.Length > 30000)
		{
			throw new InvalidOperationException();
		}
		for (int i = 0; i < value.Length; i++)
		{
			if (char.IsControl(value[i]))
			{
				throw new InvalidOperationException();
			}
			if (char.IsHighSurrogate(value[i]))
			{
				if (++i >= value.Length || !char.IsLowSurrogate(value[i]))
				{
					throw new InvalidOperationException();
				}
			}
			else if (char.IsLowSurrogate(value[i]))
			{
				throw new InvalidOperationException();
			}
		}
	}

	private static string LocalPath(string path, bool executable)
	{
		ValidateText(path);
		if (path.Length < 3 || ((path[0] < 'a' || path[0] > 'z') && (path[0] < 'A' || path[0] > 'Z')) || path[1] != ':' || (path[2] != '\\' && path[2] != '/') || path.IndexOf(':', 2) >= 0)
		{
			throw new InvalidOperationException();
		}
		string fullPath = Path.GetFullPath(path);
		uint driveTypeW = GetDriveTypeW(Path.GetPathRoot(fullPath));
		if (driveTypeW != 2 && driveTypeW != 3 && driveTypeW != 5 && driveTypeW != 6)
		{
			throw new InvalidOperationException();
		}
		if (executable)
		{
			if (!string.Equals(Path.GetExtension(fullPath), ".exe", StringComparison.OrdinalIgnoreCase) || !File.Exists(fullPath))
			{
				throw new InvalidOperationException();
			}
		}
		else if (!Directory.Exists(fullPath))
		{
			throw new InvalidOperationException();
		}
		return fullPath;
	}

	private static string Quote(string value)
	{
		StringBuilder stringBuilder = new StringBuilder("\"");
		int num = 0;
		foreach (char c in value)
		{
			if (c == '\\')
			{
				num++;
				continue;
			}
			stringBuilder.Append('\\', (c == '"') ? (num * 2 + 1) : num);
			stringBuilder.Append(c);
			num = 0;
		}
		return stringBuilder.Append('\\', num * 2).Append('"').ToString();
	}

	private static Worker Relay(IntPtr source, int destination)
	{
		return new Worker(delegate
		{
			byte[] array = new byte[16384];
			bool flag = true;
			uint read;
			while (ReadFile(source, array, (uint)array.Length, out read, IntPtr.Zero) && read != 0)
			{
				if (flag)
				{
					byte[] array2 = new byte[read];
					Buffer.BlockCopy(array, 0, array2, 0, (int)read);
					while (array2.Length != 0)
					{
						if (!WriteFile(GetStdHandle(destination), array2, (uint)array2.Length, out var written, IntPtr.Zero) || written == 0)
						{
							flag = false;
							break;
						}
						if (written == array2.Length)
						{
							break;
						}
						byte[] array3 = new byte[array2.Length - written];
						Buffer.BlockCopy(array2, (int)written, array3, 0, array3.Length);
						array2 = array3;
					}
				}
			}
		});
	}

	private static int Main(string[] arguments)
	{
		IntPtr intPtr = IntPtr.Zero;
		IntPtr intPtr2 = IntPtr.Zero;
		IntPtr read = IntPtr.Zero;
		IntPtr write = IntPtr.Zero;
		IntPtr read2 = IntPtr.Zero;
		IntPtr write2 = IntPtr.Zero;
		IntPtr intPtr3 = IntPtr.Zero;
		IntPtr intPtr4 = IntPtr.Zero;
		IntPtr intPtr5 = IntPtr.Zero;
		ProcessInformation process = default(ProcessInformation);
		Input input = null;
		Worker worker = null;
		Worker worker2 = null;
		bool flag = false;
		bool flag2 = false;
		bool flag3 = false;
		try
		{
			if (arguments.Length != 0)
			{
				throw new InvalidOperationException();
			}
			ProcessBasicInformation info = default(ProcessBasicInformation);
			if (NtQueryInformationProcess(new IntPtr(-1), 0, ref info, Marshal.SizeOf(typeof(ProcessBasicInformation)), out var _) != 0 || info.ParentId.ToUInt64() > int.MaxValue)
			{
				throw new InvalidOperationException();
			}
			intPtr = OpenProcess(1052672u, inherit: false, (int)info.ParentId.ToUInt64());
			if (intPtr == IntPtr.Zero)
			{
				throw new InvalidOperationException();
			}
			if (!GetProcessTimes(intPtr, out var created, out var exited, out var kernel, out var user) || !GetProcessTimes(new IntPtr(-1), out var created2, out exited, out kernel, out user) || created > created2)
			{
				throw new InvalidOperationException();
			}
			input = new Input();
			if (WaitForMultipleObjects(2u, new IntPtr[2]
			{
				intPtr,
				input.Ready.SafeWaitHandle.DangerousGetHandle()
			}, all: false, uint.MaxValue) != 1 || input.Line == null)
			{
				throw new InvalidOperationException();
			}
			Request request = new Json(input.Line).Read();
			if ((ulong)request.Parent != info.ParentId.ToUInt64())
			{
				throw new InvalidOperationException();
			}
			request.Executable = LocalPath(request.Executable, executable: true);
			request.Directory = LocalPath(request.Directory, executable: false);
			StringBuilder stringBuilder = new StringBuilder(Quote(request.Executable));
			foreach (string argument in request.Arguments)
			{
				ValidateText(argument);
				stringBuilder.Append(' ').Append(Quote(argument));
				if (stringBuilder.Length >= 30000)
				{
					throw new InvalidOperationException();
				}
			}
			if (stringBuilder.Length >= 30000)
			{
				throw new InvalidOperationException();
			}
			if (WaitForSingleObject(intPtr, 0u) != 258 || input.Eof.WaitOne(0))
			{
				throw new InvalidOperationException();
			}
			intPtr2 = CreateJobObjectW(IntPtr.Zero, null);
			if (intPtr2 == IntPtr.Zero)
			{
				throw new InvalidOperationException();
			}
			JobLimits limits = new JobLimits
			{
				Basic = 
				{
					Flags = 8200u,
					ActiveProcesses = 128u
				}
			};
			if (!SetInformationJobObject(intPtr2, 9, ref limits, Marshal.SizeOf(typeof(JobLimits))))
			{
				throw new InvalidOperationException();
			}
			SecurityAttributes attributes = new SecurityAttributes
			{
				Length = Marshal.SizeOf(typeof(SecurityAttributes)),
				Inherit = true
			};
			if (!CreatePipe(out read, out write, ref attributes, 0u) || !SetHandleInformation(read, 1u, 0u) || !CreatePipe(out read2, out write2, ref attributes, 0u) || !SetHandleInformation(read2, 1u, 0u))
			{
				throw new InvalidOperationException();
			}
			intPtr3 = CreateFileW("NUL", 2147483648u, 3u, ref attributes, 3u, 0u, IntPtr.Zero);
			if (intPtr3 == InvalidHandle)
			{
				intPtr3 = IntPtr.Zero;
				throw new InvalidOperationException();
			}
			IntPtr bytes = IntPtr.Zero;
			InitializeProcThreadAttributeList(IntPtr.Zero, 1, 0, ref bytes);
			if (bytes == IntPtr.Zero)
			{
				throw new InvalidOperationException();
			}
			intPtr4 = Marshal.AllocHGlobal(bytes);
			if (!InitializeProcThreadAttributeList(intPtr4, 1, 0, ref bytes))
			{
				throw new InvalidOperationException();
			}
			flag3 = true;
			intPtr5 = Marshal.AllocHGlobal(IntPtr.Size * 3);
			Marshal.WriteIntPtr(intPtr5, 0, intPtr3);
			Marshal.WriteIntPtr(intPtr5, IntPtr.Size, write);
			Marshal.WriteIntPtr(intPtr5, IntPtr.Size * 2, write2);
			if (!UpdateProcThreadAttribute(intPtr4, 0u, new IntPtr(131074), intPtr5, new IntPtr(IntPtr.Size * 3), IntPtr.Zero, IntPtr.Zero))
			{
				throw new InvalidOperationException();
			}
			StartupInfoEx startup = new StartupInfoEx
			{
				Startup = 
				{
					Size = Marshal.SizeOf(typeof(StartupInfoEx)),
					Flags = 256u,
					Input = intPtr3,
					Output = write,
					Error = write2
				},
				Attributes = intPtr4
			};
			if (!CreateProcessW(request.Executable, stringBuilder, IntPtr.Zero, IntPtr.Zero, inherit: true, 134743044u, IntPtr.Zero, request.Directory, ref startup, out process))
			{
				throw new InvalidOperationException();
			}
			if (!AssignProcessToJobObject(intPtr2, process.Process))
			{
				throw new InvalidOperationException();
			}
			flag = true;
			CloseHandle(write);
			write = IntPtr.Zero;
			CloseHandle(write2);
			write2 = IntPtr.Zero;
			CloseHandle(intPtr3);
			intPtr3 = IntPtr.Zero;
			worker = Relay(read, -11);
			worker2 = Relay(read2, -12);
			if (WaitForSingleObject(intPtr, 0u) != 258 || input.Eof.WaitOne(0))
			{
				if (!TerminateJobObject(intPtr2, 1u))
				{
					throw new InvalidOperationException();
				}
			}
			else if (ResumeThread(process.Thread) == uint.MaxValue)
			{
				throw new InvalidOperationException();
			}
			switch (WaitForMultipleObjects(3u, new IntPtr[3]
			{
				process.Process,
				intPtr,
				input.Eof.SafeWaitHandle.DangerousGetHandle()
			}, all: false, uint.MaxValue))
			{
			default:
				throw new InvalidOperationException();
			case 1u:
			case 2u:
				if (!TerminateJobObject(intPtr2, 1u))
				{
					throw new InvalidOperationException();
				}
				break;
			case 0u:
				break;
			}
			if (WaitForSingleObject(process.Process, uint.MaxValue) != 0)
			{
				throw new InvalidOperationException();
			}
			if (!GetExitCodeProcess(process.Process, out var code))
			{
				throw new InvalidOperationException();
			}
			flag2 = true;
			CloseHandle(intPtr2);
			intPtr2 = IntPtr.Zero;
			worker.Finish();
			worker2.Finish();
			return (int)code;
		}
		catch
		{
			Console.Error.WriteLine("Project launch failed.");
			return 1;
		}
		finally
		{
			if (process.Process != IntPtr.Zero && !flag2)
			{
				if (flag)
				{
					TerminateJobObject(intPtr2, 1u);
				}
				else
				{
					TerminateProcess(process.Process, 1u);
				}
				WaitForSingleObject(process.Process, 5000u);
			}
			if (intPtr2 != IntPtr.Zero)
			{
				CloseHandle(intPtr2);
			}
			worker?.Dispose();
			worker2?.Dispose();
			input?.Dispose();
			if (process.Thread != IntPtr.Zero)
			{
				CloseHandle(process.Thread);
			}
			if (process.Process != IntPtr.Zero)
			{
				CloseHandle(process.Process);
			}
			if (intPtr != IntPtr.Zero)
			{
				CloseHandle(intPtr);
			}
			if (read != IntPtr.Zero)
			{
				CloseHandle(read);
			}
			if (read2 != IntPtr.Zero)
			{
				CloseHandle(read2);
			}
			if (write != IntPtr.Zero)
			{
				CloseHandle(write);
			}
			if (write2 != IntPtr.Zero)
			{
				CloseHandle(write2);
			}
			if (intPtr3 != IntPtr.Zero)
			{
				CloseHandle(intPtr3);
			}
			if (intPtr4 != IntPtr.Zero)
			{
				if (flag3)
				{
					DeleteProcThreadAttributeList(intPtr4);
				}
				Marshal.FreeHGlobal(intPtr4);
			}
			if (intPtr5 != IntPtr.Zero)
			{
				Marshal.FreeHGlobal(intPtr5);
			}
		}
	}
}
