const cookieparser = process.server ? require('cookieparser') : undefined
export default function({ store, redirect, req }) {
  if (process.server) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.token) {
        return redirect('/confirmation')
      }
    }
  }
}