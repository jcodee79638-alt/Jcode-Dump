using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;

namespace JacCodeSetup;

internal sealed class InstallState
{
	internal string Directory;

	internal bool PathAdded;

	internal bool PathWasMissing;

	internal bool SeparatorAdded;

	internal string Token;

	internal bool Desktop = true;

	internal bool Startup = true;

	internal bool Legacy = true;

	internal readonly List<string> Files = new List<string>();

	internal void Save(string filename)
	{
		File.WriteAllBytes(filename, Bytes());
	}

	internal byte[] Bytes()
	{
		using MemoryStream memoryStream = new MemoryStream();
		using (XmlWriter xmlWriter = XmlWriter.Create(memoryStream, new XmlWriterSettings
		{
			Indent = true,
			Encoding = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)
		}))
		{
			xmlWriter.WriteStartElement("JacCodeInstall");
			xmlWriter.WriteAttributeString("version", "2");
			xmlWriter.WriteElementString("Directory", Directory);
			xmlWriter.WriteElementString("PathAdded", PathAdded.ToString());
			xmlWriter.WriteElementString("PathWasMissing", PathWasMissing.ToString());
			xmlWriter.WriteElementString("SeparatorAdded", SeparatorAdded.ToString());
			xmlWriter.WriteElementString("Token", Token ?? "");
			xmlWriter.WriteElementString("Desktop", Desktop.ToString());
			xmlWriter.WriteElementString("Startup", Startup.ToString());
			foreach (string file in Files)
			{
				xmlWriter.WriteElementString("File", file);
			}
			xmlWriter.WriteEndElement();
		}
		return memoryStream.ToArray();
	}

	internal static InstallState Load(string filename, string directory)
	{
		if (!File.Exists(filename))
		{
			return null;
		}
		XmlDocument xmlDocument = new XmlDocument();
		using (XmlReader reader = XmlReader.Create(filename, new XmlReaderSettings
		{
			DtdProcessing = DtdProcessing.Prohibit,
			XmlResolver = null
		}))
		{
			xmlDocument.Load(reader);
		}
		if (xmlDocument.DocumentElement == null || xmlDocument.DocumentElement.Name != "JacCodeInstall")
		{
			throw new InvalidDataException("The installation record is invalid.");
		}
		if (xmlDocument.DocumentElement.GetAttribute("version") != "1" && xmlDocument.DocumentElement.GetAttribute("version") != "2")
		{
			throw new InvalidDataException("The installation record version is unsupported.");
		}
		InstallState installState = new InstallState();
		installState.Directory = xmlDocument.DocumentElement["Directory"].InnerText;
		InstallState installState2 = installState;
		installState2.Legacy = xmlDocument.DocumentElement.GetAttribute("version") != "2";
		if (!installState2.Legacy)
		{
			installState2.Desktop = bool.Parse(xmlDocument.DocumentElement["Desktop"].InnerText);
			installState2.Startup = bool.Parse(xmlDocument.DocumentElement["Startup"].InnerText);
		}
		if (!string.Equals(Path.GetFullPath(installState2.Directory).TrimEnd('\\'), directory.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase))
		{
			throw new InvalidDataException("The installation record belongs to another folder.");
		}
		installState2.PathAdded = bool.Parse(xmlDocument.DocumentElement["PathAdded"].InnerText);
		installState2.PathWasMissing = bool.Parse(xmlDocument.DocumentElement["PathWasMissing"].InnerText);
		installState2.SeparatorAdded = bool.Parse(xmlDocument.DocumentElement["SeparatorAdded"].InnerText);
		installState2.Token = xmlDocument.DocumentElement["Token"].InnerText;
		if (installState2.PathAdded && !string.Equals(installState2.Token, directory, StringComparison.Ordinal))
		{
			throw new InvalidDataException("The PATH ownership record is invalid.");
		}
		foreach (XmlNode item in xmlDocument.DocumentElement.SelectNodes("File"))
		{
			Core.SafeFile(directory, item.InnerText);
			installState2.Files.Add(item.InnerText);
		}
		return installState2;
	}
}
