import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
  {
    id: 'p1',
    price: 21,
    title: 'Harry Potter and The Deathly Hollows',
    description: 'The Final Book of Harry Potter series'
  },
  {
    id: 'p2',
    price: 19,
    title: 'Harry Potter and The Philosopher Stone',
    description: 'The First Book of Harry Potter series'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((data) => 
            <ProductItem
              key={data.id}
              id={data.id}
              title={data.title}
              price={data.price}
              description={data.description}
          />
        )}
        
      </ul>
    </section>
  );
};

export default Products;
