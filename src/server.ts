import express from 'express';
import productRoutes from './routes/products.routes';
import usersRoutes from './routes/users.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productRoutes);
app.use('/users', usersRoutes);

app.use(
  (
    err: { status: number; message: string },
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction,
  ) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
  }
);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
