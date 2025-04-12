import { Github, Linkedin, Mail, Code } from "lucide-react"

const USER_INFO = {
  name: 'Yuichi Nabeshima',
  email: 'denmukuru@gmail.com',
  github: 'https://github.com/YuichiNabeshima',
  linkedin: 'https://www.linkedin.com/in/yuichi-nabeshima/',
  devto: 'https://dev.to/yuichi_nabeshima_canada',
} as const;

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Let's Connect</h2>
          <p className="text-slate-300 max-w-md mb-8">
            I'm currently looking for new opportunities in Vancouver. Feel free to reach out if you'd like to
            collaborate!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-2xl mb-10">
            <a
              href={`mailto:${USER_INFO.email}`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-slate-700 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Email</span>
            </a>

            <a
              href={USER_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-slate-700 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Github className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">GitHub</span>
            </a>

            <a
              href={USER_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-slate-700 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">LinkedIn</span>
            </a>

            <a
              href={USER_INFO.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-slate-700 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Code className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Dev.to</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} {USER_INFO.name}. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Built with</span>
              <span className="text-primary">❤</span>
              <span>in Vancouver, BC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
