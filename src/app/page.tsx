
  import { HomeProps } from "@types";

  import Hero from "@components/Hero";
  import CarCatalog from "@components/carCatalog";


  export default async function Home({ searchParams }: HomeProps) {

    return (
      <main className="overflow-hidden">
        <Hero />
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <p>Explore our cars you might like</p>
          </div>
        <CarCatalog />
        </div>
      </main>
    );
  }
