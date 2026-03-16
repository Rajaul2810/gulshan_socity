
export default function TwoPdfViewer() {
  const pdfs = [
    {
      title: "Memorandum of Association & Articles of Gulshan Society",
      url: "/file1.pdf",
    },
    {
      title: "Executive Committee Election Bye-Laws, 2025",
      url: "/file2.pdf",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {pdfs.map((pdf, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl shadow-sm p-6 flex flex-col justify-between"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {pdf.title}
          </h2>

          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View PDF
          </a>
        </div>
      ))}
    </div>
  );
}
