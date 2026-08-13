import Link from "next/link";

// Required for static export with dynamic routes
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock data for the blog post
  const blogData = {
    title: `Blog Post ${id}: An amazing article`,
    date: "August 13, 2026",
    tags: ["Placeholder", "Blog"],
    content: "This is the placeholder content for the blog post. Imagine a long and engaging article here with lots of insights and technical details. Soon this will be filled with real content written by Soroush.\n\nMore paragraphs could be here, detailing the research, projects, or thoughts on various topics in machine learning, software engineering, and beyond!"
  };

  return (
    <main className="min-h-screen w-screen overflow-y-auto bg-gray-100 text-gray-900 font-sans selection:bg-blue-200 relative">
      
      {/* Overall Background Image with Alpha 0.6 and Blur */}
      <div 
        className="fixed inset-0 bg-[url('/bg_notes.jpg')] bg-cover bg-center bg-fixed pointer-events-none z-0 blur-[2px]" 
        style={{ opacity: 0.6 }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-800 font-bold mb-8 hover:text-blue-900 bg-white/70 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm border border-gray-200 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <article className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-lg rounded-3xl p-8 md:p-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {blogData.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/60 text-gray-800 rounded-md text-sm border border-gray-300 font-bold shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            {blogData.title}
          </h1>
          
          <p className="text-gray-500 font-bold mb-10 tracking-wide uppercase text-sm border-b border-gray-300 pb-6">
            Published on {blogData.date}
          </p>

          <div className="prose prose-lg prose-blue max-w-none text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
            {blogData.content}
          </div>
        </article>
      </div>
    </main>
  );
}
