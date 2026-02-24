"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#051111] pt-20 pb-10 text-slate-300 border-t border-emerald-900/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-900/20 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-emerald-800/10 blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-4 md:grid-cols-2"
        >
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl font-bold text-white tracking-tight">
                Med<span className="text-emerald-500">Express</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming healthcare delivery in Domariyaganj. We bridge the gap between premium pharmacies in Lucknow and your doorstep, ensuring you get genuine medicines safely and quickly.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5, color: "#10b981" }}
                  className="rounded-full bg-slate-800/50 p-3 text-slate-400 transition-colors hover:bg-emerald-900/30 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/30"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-emerald-400"
                  >
                    <ArrowRight size={14} className="text-emerald-600" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0 text-emerald-500" />
                <span className="text-sm text-slate-400">
                  123 Healthcare Ave, Domariyaganj, <br /> Uttar Pradesh, India 272189
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-emerald-500" />
                <span className="text-sm text-slate-400">+91 86014 39557</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-emerald-500" />
                <span className="text-sm text-slate-400">support@medexpress.in</span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-slate-400">
              Subscribe to get the latest health tips and exclusive offers.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full bg-slate-800/50 py-3 pl-5 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-emerald-900/20 p-4 backdrop-blur-sm border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Trusted by 5000+ Families</p>
                  <p className="text-[10px] text-slate-400">Safe & Secure Delivery</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 border-t border-slate-800 pt-8 text-center"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} MedExpress. All rights reserved.
              </p>
              <span className="rounded bg-emerald-900/40 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                v1.1.0-live
              </span>
            </div>
            <div className="flex gap-6 text-xs text-slate-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
