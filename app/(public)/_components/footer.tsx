import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
// import {
//   Logo,
//   LogoImageDesktop,
//   LogoImageMobile,
// } from "@/components/shadcnblocks/logo";

import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constant/categories";
import { LuCopyright } from "react-icons/lu";

interface FooterLink {
  name: string;
  href: string;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}
interface FooterLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

interface FooterBasicProps {
  logo?: FooterLogo;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string;
}
type Props = Partial<Footer2Props>;

const defaultProps: Footer2Props = {
  logo: {
    url: "https://www.shadcnblocks.com",
    src: "/images/logo/shadcnblocks-logo-word.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  description: "Delivering wholesale products to Indonesia.",
  sections: [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Features", href: "#" },
        { name: "Integrations", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help center", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Status", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Guides", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Sales", href: "#" },
        { name: "Advertise", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Shadcnblocks.com. All rights reserved.",
  legalLinks: [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
};

const MAX_SECTIONS = 4;

export const Footer = (props: Props) => {
  const { logo, description, sections, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <footer className="py-16 px-4 lg:px-0">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-8 md:flex-row pb-8 border-b">
          <div className="max-w-96">
            <h4 className="font-mono font-extrabold text-xl">DELIFUNDS</h4>
            <h5 className="mb-4">Delivering wholesale products to Indonesia</h5>

            <div className="mb-4">
              <h6 className="font-mono font-semibold">China Office</h6>
              <p className="text-sm">
                328 Tian Tong Lu, Hongkou District, Shanghai (Landmark Center).
              </p>
            </div>
            <div>
              <h6 className="font-mono font-semibold">Indonesia Office</h6>
              <p className="text-sm">
                Sopo Del Tower, Jl. Mega Kuningan Barat III No.1-6 Lot 10,
                RT.3/RW.3, Kuningan Timur, Kecamatan Setiabudi, Kota Jakarta
                Selatan, Jakarta 12950
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-mono font-semibold">Products</h4>

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {CATEGORIES.map((cat) => (
                <li key={cat.label} className="underline">
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex items-center gap-2 font-mono">
          <LuCopyright />
          {new Date().getFullYear()} Delifunds.id
        </div>
      </div>
    </footer>
  );
};
