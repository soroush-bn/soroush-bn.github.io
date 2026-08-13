import sys
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add selectedTag state and blog data
state_insert_pattern = r'(const \[activeSection, setActiveSection\] = useState<string>\("#home"\);)'
state_insert_replacement = r'''\1
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const blogs = [
    { id: "1", title: "My Journey into Machine Learning", excerpt: "How I started learning ML and transitioned into research.", tags: ["Machine Learning", "Career"], date: "Oct 12, 2025", img: "/paper_bg.jpg" },
    { id: "2", title: "Building a Robot with Computer Vision", excerpt: "A deep dive into our hackathon-winning tennis ball collector.", tags: ["Robotics", "Computer Vision", "C++"], date: "Nov 5, 2025", img: "/paper_bg.jpg" },
    { id: "3", title: "Why Kotlin is Better than Java", excerpt: "Exploring the differences and why I prefer Kotlin for mobile and backend.", tags: ["Kotlin", "Java", "Mobile"], date: "Jan 20, 2026", img: "/paper_bg.jpg" },
    { id: "4", title: "Synthetic Data Generation with VQ-VAEs", excerpt: "A summary of my recent research on bio-signals.", tags: ["Machine Learning", "Research"], date: "Mar 10, 2026", img: "/paper_bg.jpg" },
  ];
  const allTags = ["All", ...Array.from(new Set(blogs.flatMap(b => b.tags)))];
  const filteredBlogs = selectedTag === "All" ? blogs : blogs.filter(b => b.tags.includes(selectedTag));
'''
content = re.sub(state_insert_pattern, state_insert_replacement, content, 1)

# 2. Update navLinks
nav_pattern = r'(\{ name: "About", id: "#about" \},)'
nav_replacement = r'\1\n    { name: "Blog", id: "#blog" },'
content = re.sub(nav_pattern, nav_replacement, content, 1)

# 3. Add Blog Section HTML after About Section
about_end_pattern = r'(<h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">About Me</h2>.*?</div>\s*</section>\s*</div>)'

blog_section_html = r'''\1

        {/* Blog Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#blog' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Blog & Articles</h2>
              
              {/* Tag Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-colors border ${
                      selectedTag === tag 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white/70 text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredBlogs.map(blog => (
                  <a key={blog.id} href={`/blog/${blog.id}`} className="block group">
                    <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-6 rounded-2xl h-full hover:shadow-lg transition-all transform group-hover:-translate-y-1">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{blog.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">{blog.title}</h3>
                      <p className="text-gray-700 font-medium leading-relaxed mb-6">{blog.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {blog.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-white/60 text-gray-800 rounded text-xs border border-gray-300 font-bold shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>'''

content = re.sub(about_end_pattern, blog_section_html, content, 1, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)
print("Blog section injected.")
