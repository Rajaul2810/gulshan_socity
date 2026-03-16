
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
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {pdfs.map((pdf, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 border"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            {pdf.title}
          </h2>

          <div className="w-full h-[500px] overflow-hidden rounded-lg border">
            <iframe
              src={pdf.url}
              className="w-full h-full"
              title={pdf.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
