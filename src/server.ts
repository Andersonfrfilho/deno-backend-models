import { oak,colors } from '../modules.ts';
const port: number = 8000;
const app = new oak.Application();

import routes from './routes/index.ts';

app.use(routes.users.allowedMethods());
app.use(routes.users.routes());


app.addEventListener("listen", ({ secure, hostname, port }) => {
  const {yellow,green} = colors;
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
