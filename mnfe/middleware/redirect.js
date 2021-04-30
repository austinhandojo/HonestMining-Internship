export default ({ route, redirect }) => {
  switch (route.path) {

    // Add more case here
    case '/docs': return redirect('/docs/button');

    default: return;
  }
};
