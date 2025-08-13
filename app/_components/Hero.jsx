import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "80vh" }}>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-2 lg:gap-16 ">
          <div className="relative lg:h-100 lg:order-last lg:h-full">
            <div>
              <Image
                alt="main-image"
                src="/relaxing.jpg"
                width={600}
                height={500}
                className="max-w-[290px] sm:max-w-xs lg:max-w-none lg:w-[400px] object-cover rounded-lg shadow-image mx-auto"
                priority
              />
            </div>
          </div>

          <div className="lg:py-24">
            <h2
              className="text-3xl font-bold sm:text-4xl text-center sm:text-left bg-gradient-to-r from-[#43ea7c] to-[#006400ff] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Finde deinen
              <span className="bg-gradient-to-r from-[#43ea7c] to-[#006400ff] bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Spezialisten</span>
            </h2>

            <p className="mt-4 text-black dark:text-[#e5e7eb] text-center sm:text-left">
              Willkommen bei Beauty Booking – der Plattform, auf der Schönheit ihre Meister findet! Bei uns ist jeder Meister nicht nur ein Handwerker, sondern ein wahrer Künstler, der die Kunst der Pflege perfekt beherrscht. Wir bieten Meistern eine einzigartige Möglichkeit, ihre Dienstleistungen zu präsentieren, ihren Stil und ihre Fähigkeiten hervorzuheben, neue Kunden zu gewinnen und ihren festen Kundenstamm zu erweitern. Auf Beauty Booking finden Sie ein breites Spektrum an Dienstleistungen – von Hautpflege über Make-up, von Maniküre bis hin zu Haarstyling. Werden Sie Teil unserer Community, um die besten Meister zu entdecken und den perfekten Spezialisten zu finden, der Ihren Tag noch schöner macht.
            </p>

            <Link href="/explorePage" passHref>
              <Button
                className="mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 hover:scale-105 focus:scale-105 transition-transform duration-200 text-white"
                style={{ background: "linear-gradient(90deg, #43ea7c 0%, #006400ff 100%)" }}
              >
                <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-12a8 8 0 1116 0c0 6.627-3.582 12-8 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Meister in der Nähe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;