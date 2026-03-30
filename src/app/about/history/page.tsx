import Link from "next/link";
import {
  BookOpenIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const pdfs = [
  {
    title: "Memorandum of Association & Articles of Gulshan Society",
    description:
      "Founding document outlining the society’s constitution, objectives, and governance framework.",
    url: "/file1.pdf",
  },
  {
    title: "Executive Committee Election Bye-Laws, 2025",
    description:
      "Rules and procedures governing EC elections for the 2025 cycle and beyond.",
    url: "/file2.pdf",
  },
] as const;

export default function HistoryDocumentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100/80 dark:from-gray-900 dark:via-gray-950 dark:to-primary-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,177,78,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,177,78,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary-200/60 dark:border-primary-800/50">
            <BookOpenIcon className="w-4 h-4 shrink-0" aria-hidden />
            <span>History &amp; legal documents</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 tracking-tight">
            Society{" "}
            <span className="text-primary dark:text-primary-400">
              documents
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Official memorandum, articles, and bye-laws in PDF format. Open each
            document in a new tab to read or download.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/about/mission"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Mission &amp; vision
              <ArrowRightIcon className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary/30 dark:border-primary-700/60 text-primary dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/50 font-semibold transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Back to About
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Available <span className="text-primary dark:text-primary-400">PDFs</span>
            </h2>
            
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0">
            {pdfs.map((pdf, index) => (
              <li key={pdf.url}>
                <article className="group h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400 ring-1 ring-primary-200/50 dark:ring-primary-800/50">
                      <DocumentTextIcon
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-primary-400/90 mb-1">
                        Document {index + 1}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        {pdf.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                    {pdf.description}
                  </p>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start px-5 py-3 rounded-xl bg-primary hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
                  >
                    View PDF
                    <ArrowTopRightOnSquareIcon
                      className="h-4 w-4 shrink-0 opacity-90"
                      aria-hidden
                    />
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
