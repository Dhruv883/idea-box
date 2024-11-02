import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-16 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold">IdeaBox</h2>
            <p className="mt-2 text-gray-600">
              Share Ideas, Build Projects, Collaborate
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="" className="text-gray-600 hover:text-white">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4">Socials</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/Dhruv883"
                  className="text-gray-600 hover:text-white"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/Dhruv0883"
                  className="text-gray-600 hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/dhruv-dedhia0803/"
                  className="text-gray-600 hover:text-white"
                >
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-gray-600">
          Copyright © 2024. All rights reserved
        </div>
      </div>
    </footer>
  );
}
