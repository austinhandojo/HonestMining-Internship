const cookieparser = process.server ? require('cookieparser') : undefined
export default function({ store, redirect, req }) {
  if (process.server) {
    if (store.state.user.auth) {
      return redirect('/join')
    }

    if (!req.headers.cookie) {
      return redirect('/login')
    }
  }
}