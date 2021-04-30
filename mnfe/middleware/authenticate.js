import Client from '~/service/http/Client';

export default async ({ app, store, redirect }) => {
  if (!store.state.user.auth) {
    return redirect('/login')
  }
}
