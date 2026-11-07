using System;
using System.Runtime.InteropServices;
using System.Threading;

internal static class AttachmentGuard
{
	private struct BasicLimits
	{
		public long PerProcessUserTimeLimit;

		public long PerJobUserTimeLimit;

		public uint LimitFlags;

		public UIntPtr MinimumWorkingSetSize;

		public UIntPtr MaximumWorkingSetSize;

		public uint ActiveProcessLimit;

		public UIntPtr Affinity;

		public uint PriorityClass;

		public uint SchedulingClass;
	}

	private struct IO
	{
		public ulong ReadOperationCount;

		public ulong WriteOperationCount;

		public ulong OtherOperationCount;

		public ulong ReadTransferCount;

		public ulong WriteTransferCount;

		public ulong OtherTransferCount;
	}

	private struct Limits
	{
		public BasicLimits BasicLimitInformation;

		public IO IoInfo;

		public UIntPtr ProcessMemoryLimit;

		public UIntPtr JobMemoryLimit;

		public UIntPtr PeakProcessMemoryUsed;

		public UIntPtr PeakJobMemoryUsed;
	}

	private struct ProcessInfo
	{
		public IntPtr ExitStatus;

		public IntPtr PebBaseAddress;

		public IntPtr AffinityMask;

		public IntPtr BasePriority;

		public UIntPtr UniqueProcessId;

		public UIntPtr InheritedFromUniqueProcessId;
	}

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern IntPtr CreateJobObject(IntPtr attributes, string name);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool SetInformationJobObject(IntPtr job, int type, ref Limits limits, int size);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern bool AssignProcessToJobObject(IntPtr job, IntPtr process);

	[DllImport("kernel32.dll", SetLastError = true)]
	private static extern IntPtr OpenProcess(uint access, bool inherit, int pid);

	[DllImport("kernel32.dll")]
	private static extern bool CloseHandle(IntPtr handle);

	[DllImport("ntdll.dll")]
	private static extern int NtQueryInformationProcess(IntPtr process, int type, ref ProcessInfo info, int size, out int returned);

	private static ulong Parent(IntPtr process)
	{
		ProcessInfo info = default(ProcessInfo);
		if (NtQueryInformationProcess(process, 0, ref info, Marshal.SizeOf(typeof(ProcessInfo)), out var _) != 0)
		{
			throw new InvalidOperationException();
		}
		return info.InheritedFromUniqueProcessId.ToUInt64();
	}

	private static int Main(string[] args)
	{
		IntPtr intPtr = IntPtr.Zero;
		IntPtr intPtr2 = IntPtr.Zero;
		try
		{
			if (args.Length != 2 || !int.TryParse(args[0], out var result) || !int.TryParse(args[1], out var result2) || result <= 0 || result2 <= 0 || result == result2 || Parent(new IntPtr(-1)) != (ulong)result2)
			{
				throw new InvalidOperationException();
			}
			intPtr2 = OpenProcess(5377u, inherit: false, result);
			if (intPtr2 == IntPtr.Zero || Parent(intPtr2) != (ulong)result2)
			{
				throw new InvalidOperationException();
			}
			intPtr = CreateJobObject(IntPtr.Zero, null);
			if (intPtr == IntPtr.Zero)
			{
				throw new InvalidOperationException();
			}
			Limits limits = new Limits
			{
				BasicLimitInformation = 
				{
					LimitFlags = 8968u,
					ActiveProcessLimit = 1u
				},
				ProcessMemoryLimit = new UIntPtr(268435456uL),
				JobMemoryLimit = new UIntPtr(335544320uL)
			};
			if (!SetInformationJobObject(intPtr, 9, ref limits, Marshal.SizeOf(typeof(Limits))) || !AssignProcessToJobObject(intPtr, intPtr2))
			{
				throw new InvalidOperationException();
			}
			Console.WriteLine("GUARDED");
			Console.Out.Flush();
			using (new Timer(delegate
			{
				Environment.Exit(0);
			}, null, 25000, -1))
			{
				while (Console.In.ReadLine() != null)
				{
				}
			}
			return 0;
		}
		catch
		{
			Console.WriteLine("UNAVAILABLE");
			return 1;
		}
		finally
		{
			if (intPtr2 != IntPtr.Zero)
			{
				CloseHandle(intPtr2);
			}
			if (intPtr != IntPtr.Zero)
			{
				CloseHandle(intPtr);
			}
		}
	}
}
