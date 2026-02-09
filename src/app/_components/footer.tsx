import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-20 flex flex-col lg:flex-row items-center">
          {/* Left side text */}
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-center lg:text-left mb-8 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js
          </h3>

          {/* Right side button */}
          <div className="flex justify-center lg:justify-start lg:pl-4 lg:w-1/2">
            <a
              href="https://trendingnews.globelynks.com"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors text-center"
            >
              Read Trending News
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;