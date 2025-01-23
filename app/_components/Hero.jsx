import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "80vh" }}>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-2 lg:gap-16 ">
          <div className="relative h-60 lg:h-100 overflow-hidden lg:order-last lg:h-full">
            <div>
              <img
                alt="main-image"
                src="/relaxing.jpg"
                className="h-[500px] w-[400px] object-cover rounded-lg shadow-image"
              />
            </div>
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Finde deinen
              <span className="text-green-800"> Spezialisten</span>
            </h2>

            <p className="mt-4 text-black">
              Willkommen bei Beauty Booking - der Plattform, auf der Schönheit
              ihren Meister findet! Bei uns ist jeder Meister nicht nur ein
              Handwerker, sondern ein echter Künstler, der die Kunst der Pflege
              für Sie beherrscht. Wir bieten Meistern eine einzigartige
              Möglichkeit, ihre Dienstleistungen zu präsentieren, ihren Stil и
              ihre Fähigkeiten zu betonen, neue Kunden anzuziehen und ihren
              Stammkundenkreis zu erweitern. Auf Beauty Booking finden Sie ein
              breites Spektrum an Dienstleistungen - von Hautpflege bis Make-up,
              von Maniküre bis Haarstyling. Treten Sie unserer Gemeinschaft bei,
              um die besten Meister zu entdecken und den perfekten Spezialisten
              zu finden, der Ihren Tag noch schöner macht.
            </p>

            <Link href="/explorePage" passHref>
              <Button
                className="mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
                style={{ backgroundColor: "#006400", color: "#ffffff" }}
              >
                Jetzt Erkunden
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;