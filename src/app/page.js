"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Leaf, Mountain, Wheat, Palette, Droplet, Waves, Trees, Coffee, PartyPopper, Building2, Calendar, User, Users, ArrowRight, MapPin, Map, Target, Flag, Network, UserCheck } from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const supabase = createClient();
    async function fetchNews() {
      const { data } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      if (data) setNewsList(data);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, () => ({
        left: `${Math.random() * 100}%`,
        width: `${4 + Math.random() * 8}px`,
        height: `${4 + Math.random() * 8}px`,
        background: `hsl(${140 + Math.random() * 40}, 60%, ${
          60 + Math.random() * 20
        }%)`,
        animationDuration: `${8 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 8}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .scale-in"
    );
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [newsList]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Image
              src="/images/bantaeng-logo.png"
              alt="Logo Bantaeng"
              width={44}
              height={44}
              className="navbar-logo"
            />
            <div className="navbar-title">
              Karatuang
              <span>Kel. Karatuang, Bantaeng</span>
            </div>
          </div>

          <ul className="navbar-links">
            <li>
              <a href="#beranda" onClick={() => scrollToSection("beranda")}>
                Beranda
              </a>
            </li>
            <li>
              <a href="#profil" onClick={() => scrollToSection("profil")}>
                Profil
              </a>
            </li>
            <li>
              <a href="#pemerintahan" onClick={() => scrollToSection("pemerintahan")}>
                Pemerintahan
              </a>
            </li>
            <li>
              <a href="#tentang" onClick={() => scrollToSection("tentang")}>
                Tentang
              </a>
            </li>
            <li>
              <a href="#wisata" onClick={() => scrollToSection("wisata")}>
                Wisata
              </a>
            </li>
            <li>
              <a
                href="#sumber-daya"
                onClick={() => scrollToSection("sumber-daya")}
              >
                Sumber Daya
              </a>
            </li>
            <li>
              <a href="#berita" onClick={() => scrollToSection("berita")}>
                Berita
              </a>
            </li>
            <li>
              <a href="#lokasi" onClick={() => scrollToSection("lokasi")}>
                Lokasi
              </a>
            </li>
          </ul>

          <button
            className="navbar-mobile-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button
          className="mobile-close-btn"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Tutup menu"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <a href="#beranda" onClick={() => scrollToSection("beranda")}>
          Beranda
        </a>
        <a href="#profil" onClick={() => scrollToSection("profil")}>
          Profil
        </a>
        <a href="#pemerintahan" onClick={() => scrollToSection("pemerintahan")}>
          Pemerintahan
        </a>
        <a href="#tentang" onClick={() => scrollToSection("tentang")}>
          Tentang
        </a>
        <a href="#wisata" onClick={() => scrollToSection("wisata")}>
          Wisata
        </a>
        <a href="#sumber-daya" onClick={() => scrollToSection("sumber-daya")}>
          Sumber Daya
        </a>
        <a href="#berita" onClick={() => scrollToSection("berita")}>
          Berita
        </a>
        <a href="#lokasi" onClick={() => scrollToSection("lokasi")}>
          Lokasi
        </a>
      </div>

      {/* HERO SECTION */}
      <section className="hero" id="beranda">
        <div className="hero-bg">
          <Image
            src="/images/waterfall-hero.png"
            alt="Pemandangan alam Karatuang"
            fill
            className="hero-bg-image"
            priority
          />
          <div className="hero-bg-overlay"></div>
        </div>

        {/* Floating particles */}
        <div className="hero-particles">
          {particles.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={p}
            />
          ))}
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              Sulawesi Selatan, Indonesia
            </div>

            <h1 className="hero-title">
              Kelurahan
              <br />
              <span className="highlight">Karatuang</span>
            </h1>

            <p className="hero-subtitle">
              Sebuah permata tersembunyi di Kabupaten Bantaeng yang menyimpan
              keindahan alam luar biasa, kekayaan budaya, dan pesona air terjun
              yang memukau di jantung Sulawesi Selatan.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">3+</div>
                <div className="hero-stat-label">Destinasi Wisata</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">5K+</div>
                <div className="hero-stat-label">Penduduk</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">∞</div>
                <div className="hero-stat-label">Pesona Alam</div>
              </div>
            </div>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => scrollToSection("wisata")}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Jelajahi Wisata
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection("lokasi")}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Lihat Lokasi
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <Image
                src="/images/waterfall-hero.png"
                alt="Air Terjun Karatuang Bantaeng"
                width={600}
                height={450}
                className="hero-main-image"
                priority
              />
            </div>
            <div className="hero-float-card">
              <div className="hero-float-icon green"><Leaf size={24} /></div>
              <div className="hero-float-text">
                <strong>Surga Tersembunyi</strong>
                <span>Keindahan alam yang masih alami</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFIL SECTION */}
      <section className="section" id="profil">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Profil Kelurahan
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">
              Visi & Misi <span className="highlight">Karatuang</span>
            </h2>
            <p className="section-description">
              Mewujudkan Kelurahan Karatuang yang maju, mandiri, dan sejahtera berlandaskan kearifan lokal.
            </p>
          </div>

          <div className="profil-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div className="profil-card fade-in-left" style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'scale(3)' }}>
                <Target size={100} />
              </div>
              <div className="profil-icon" style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Target size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Visi</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                "Terwujudnya Masyarakat Kelurahan Karatuang yang Religius, Mandiri, Sejahtera, dan Berbudaya melalui Pelayanan Prima serta Pemanfaatan Potensi Lokal yang Berkelanjutan."
              </p>
            </div>

            <div className="profil-card fade-in-right" style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'scale(3)' }}>
                <Flag size={100} />
              </div>
              <div className="profil-icon" style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Flag size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Misi</h3>
              <ul style={{ color: '#4b5563', lineHeight: '1.7', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.</li>
                <li>Meningkatkan tata kelola pemerintahan yang baik dan bersih (Good Governance).</li>
                <li>Mendorong pertumbuhan ekonomi kerakyatan berbasis potensi lokal.</li>
                <li>Melestarikan nilai-nilai budaya dan kearifan lokal masyarakat.</li>
              </ul>
            </div>
          </div>
          
          <div className="demographics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {[
               { icon: <MapPin size={24} />, label: 'Luas Wilayah', value: '± 5.2 km²' },
               { icon: <Users size={24} />, label: 'Total Penduduk', value: '5,000+ Jiwa' },
               { icon: <Building2 size={24} />, label: 'Jumlah RW', value: '4 RW' },
               { icon: <Network size={24} />, label: 'Jumlah RT', value: '12 RT' },
            ].map((stat, i) => (
              <div key={i} className="demo-card fade-in" style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ backgroundColor: '#22c55e', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PEMERINTAHAN SECTION */}
      <section className="section section-alt" id="pemerintahan">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Struktur Organisasi
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">
              Pemerintahan <span className="highlight">Karatuang</span>
            </h2>
            <p className="section-description">
              Susunan organisasi dan tata kerja aparatur pemerintahan Kelurahan Karatuang dalam melayani masyarakat.
            </p>
          </div>

          <div className="org-chart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', position: 'relative' }}>
            {/* Lurah */}
            <div className="org-node fade-in" style={{ backgroundColor: '#fff', border: '2px solid #22c55e', padding: '1.5rem 2.5rem', borderRadius: '12px', textAlign: 'center', minWidth: '250px', zIndex: 2, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <UserCheck size={40} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>Nama Lurah</h3>
              <p style={{ color: '#22c55e', fontWeight: '600', fontSize: '0.875rem' }}>Lurah Karatuang</p>
            </div>

            {/* Line down */}
            <div style={{ width: '2px', height: '40px', backgroundColor: '#cbd5e1', zIndex: 1 }}></div>
            
            {/* Seklur */}
            <div className="org-node fade-in" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem 2rem', borderRadius: '12px', textAlign: 'center', minWidth: '220px', zIndex: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <User size={30} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>Nama Seklur</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Sekretaris Lurah</p>
            </div>

            {/* Line down to Kasi */}
            <div style={{ width: '2px', height: '40px', backgroundColor: '#cbd5e1', zIndex: 1 }}></div>
            
            {/* Horizontal Line connecting Kasi */}
            <div style={{ display: 'flex', width: '100%', maxWidth: '900px', padding: '0 1rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ width: '50%', height: '2px', backgroundColor: '#cbd5e1', marginLeft: 'auto' }}></div>
                <div style={{ position: 'absolute', top: 0, right: '0', left: '0', margin: 'auto', width: '2px', height: '30px', backgroundColor: '#cbd5e1' }}></div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ width: '100%', height: '2px', backgroundColor: '#cbd5e1' }}></div>
                <div style={{ position: 'absolute', top: 0, right: '0', left: '0', margin: 'auto', width: '2px', height: '30px', backgroundColor: '#cbd5e1' }}></div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ width: '50%', height: '2px', backgroundColor: '#cbd5e1' }}></div>
                <div style={{ position: 'absolute', top: 0, right: '0', left: '0', margin: 'auto', width: '2px', height: '30px', backgroundColor: '#cbd5e1' }}></div>
              </div>
            </div>

            {/* Kasi Cards */}
            <div style={{ display: 'flex', width: '100%', maxWidth: '900px', padding: '0 1rem' }}>
              <div style={{ flex: 1, padding: '0 0.5rem' }}>
                <div className="org-node fade-in" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem 1rem', borderRadius: '12px', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <User size={24} />
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>Nama Kasi</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Kasi Pemerintahan</p>
                </div>
              </div>
              <div style={{ flex: 1, padding: '0 0.5rem' }}>
                <div className="org-node fade-in" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem 1rem', borderRadius: '12px', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transitionDelay: '0.1s' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <User size={24} />
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>Nama Kasi</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Kasi Trantib</p>
                </div>
              </div>
              <div style={{ flex: 1, padding: '0 0.5rem' }}>
                <div className="org-node fade-in" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem 1rem', borderRadius: '12px', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transitionDelay: '0.2s' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <User size={24} />
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>Nama Kasi</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Kasi Pelayanan Umum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section" id="tentang">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-section fade-in-left">
              <div className="about-image-main">
                <Image
                  src="/images/village-culture.png"
                  alt="Kehidupan masyarakat Karatuang"
                  width={600}
                  height={420}
                />
              </div>
              <div className="about-image-accent">
                <Image
                  src="/images/bantaeng-logo.png"
                  alt="Logo Kabupaten Bantaeng"
                  width={180}
                  height={180}
                />
              </div>
            </div>

            <div className="about-content fade-in-right">
              <div className="section-label">
                <span className="section-label-line"></span>
                Tentang Kami
                <span className="section-label-line"></span>
              </div>
              <h2>
                Mengenal Lebih Dekat{" "}
                <span className="highlight">Karatuang</span>
              </h2>
              <p className="about-text">
                Kelurahan Karatuang merupakan salah satu kelurahan yang terletak
                di Kecamatan Bantaeng, Kabupaten Bantaeng, Provinsi Sulawesi
                Selatan. Daerah ini dikenal dengan keindahan alamnya yang masih
                sangat asri, dengan hamparan pegunungan hijau, air terjun yang
                eksotis, dan udara yang sejuk.
              </p>
              <p className="about-text">
                Masyarakat Karatuang sebagian besar bermata pencaharian di
                bidang pertanian, perkebunan, dan perikanan. Kearifan lokal
                masyarakat yang masih terjaga menjadikan Karatuang sebagai
                destinasi yang menarik untuk dikunjungi.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon"><Mountain size={24} /></div>
                  <span>Alam Pegunungan</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon"><Wheat size={24} /></div>
                  <span>Pertanian Subur</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon"><Palette size={24} /></div>
                  <span>Budaya Kaya</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon"><Droplet size={24} /></div>
                  <span>Air Terjun Eksotis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURISM SECTION */}
      <section className="section section-alt" id="wisata">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Destinasi Wisata
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">
              Jelajahi Pesona Alam Karatuang
            </h2>
            <p className="section-description">
              Temukan keindahan alam yang masih perawan, air terjun yang
              memukau, dan pemandangan pegunungan yang menakjubkan di Kelurahan
              Karatuang.
            </p>
          </div>

          <div className="tourism-grid">
            <div className="tourism-card fade-in" style={{ transitionDelay: "0.1s" }}>
              <Image
                src="/images/waterfall-hero.png"
                alt="Air Terjun Bissapu"
                width={500}
                height={320}
                className="tourism-card-image"
              />
              <div className="tourism-card-overlay"></div>
              <div className="tourism-card-content">
                <div className="tourism-card-badge">
                  <span><Waves size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom'}} /></span> Wisata Alam
                </div>
                <h3 className="tourism-card-title">Air Terjun Bissapu</h3>
                <p className="tourism-card-desc">
                  Air terjun bertingkat yang megah dengan pancuran air jernih
                  dikelilingi batu-batu besar dan pepohonan tropis yang rindang.
                  Spot favorit para pecinta alam.
                </p>
              </div>
            </div>

            <div className="tourism-card fade-in" style={{ transitionDelay: "0.2s" }}>
              <Image
                src="/images/waterfall-wisata.png"
                alt="Air Terjun Erelebu"
                width={500}
                height={320}
                className="tourism-card-image"
              />
              <div className="tourism-card-overlay"></div>
              <div className="tourism-card-content">
                <div className="tourism-card-badge">
                  <span><Trees size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom'}} /></span> Wisata Alam
                </div>
                <h3 className="tourism-card-title">Air Terjun Erelebu</h3>
                <p className="tourism-card-desc">
                  Pesona air terjun alami yang tersembunyi di tengah hutan
                  belantara. Suara gemericik air yang menenangkan dan udara
                  pegunungan yang segar.
                </p>
              </div>
            </div>

            <div className="tourism-card fade-in" style={{ transitionDelay: "0.3s" }}>
              <Image
                src="/images/village-culture.png"
                alt="Wisata Budaya Karatuang"
                width={500}
                height={320}
                className="tourism-card-image"
              />
              <div className="tourism-card-overlay"></div>
              <div className="tourism-card-content">
                <div className="tourism-card-badge">
                  <span><Palette size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom'}} /></span> Wisata Budaya
                </div>
                <h3 className="tourism-card-title">Kampung Budaya</h3>
                <p className="tourism-card-desc">
                  Nikmati kekayaan budaya masyarakat Karatuang dengan rumah
                  tradisional, upacara adat, dan keramahan penduduk lokal yang
                  tak terlupakan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="section" id="sumber-daya">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Sumber Daya & Potensi
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">
              Kekayaan Alam & Penghasilan
            </h2>
            <p className="section-description">
              Kelurahan Karatuang memiliki berbagai potensi sumber daya alam yang
              menjadi tumpuan penghasilan masyarakat setempat.
            </p>
          </div>

          <div className="resources-grid">
            <div className="resource-card fade-in" style={{ transitionDelay: "0.1s" }}>
              <div className="resource-card-image-wrapper">
                <Image
                  src="/images/agriculture.png"
                  alt="Pertanian Karatuang"
                  width={400}
                  height={200}
                  className="resource-card-image"
                />
                <div className="resource-card-icon-badge"><Wheat size={24} /></div>
              </div>
              <div className="resource-card-body">
                <h3 className="resource-card-title">Pertanian</h3>
                <p className="resource-card-desc">
                  Tanah subur Karatuang menghasilkan padi berkualitas tinggi,
                  jagung, sayur-mayur, dan berbagai tanaman pangan. Sawah
                  terasering menjadi pemandangan khas daerah ini.
                </p>
                <div className="resource-card-tags">
                  <span className="resource-tag">Padi</span>
                  <span className="resource-tag">Jagung</span>
                  <span className="resource-tag">Sayuran</span>
                  <span className="resource-tag">Palawija</span>
                </div>
              </div>
            </div>

            <div className="resource-card fade-in" style={{ transitionDelay: "0.2s" }}>
              <div className="resource-card-image-wrapper">
                <Image
                  src="/images/plantation.png"
                  alt="Perkebunan Karatuang"
                  width={400}
                  height={200}
                  className="resource-card-image"
                />
                <div className="resource-card-icon-badge"><Coffee size={24} /></div>
              </div>
              <div className="resource-card-body">
                <h3 className="resource-card-title">Perkebunan</h3>
                <p className="resource-card-desc">
                  Dataran tinggi Karatuang ideal untuk perkebunan kopi, cengkeh,
                  cokelat, dan kelapa. Hasil perkebunan menjadi komoditas utama
                  ekspor daerah.
                </p>
                <div className="resource-card-tags">
                  <span className="resource-tag">Kopi</span>
                  <span className="resource-tag">Cengkeh</span>
                  <span className="resource-tag">Cokelat</span>
                  <span className="resource-tag">Kelapa</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* NEWS / BERITA SECTION */}
      <section className="section section-alt" id="berita">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Berita & Artikel
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">Kabar Terbaru Karatuang</h2>
            <p className="section-description">
              Ikuti perkembangan terbaru seputar kegiatan, pembangunan, dan
              informasi penting dari Kelurahan Karatuang.
            </p>
          </div>

          <div className="news-grid">
            {newsList.length > 0 ? (
              <>
                <Link href={`/berita/${newsList[0].id}`} className="news-featured fade-in-left" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                    <Image
                      src={newsList[0].image_url || "/images/waterfall-hero.png"}
                      alt={newsList[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="news-featured-image"
                    />
                    <div className="news-featured-overlay"></div>
                    <div className="news-featured-content">
                      <span className={`news-category ${newsList[0].type === 'kegiatan' ? 'event' : ''}`}>
                        {newsList[0].type === 'kegiatan' ? <PartyPopper size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} /> : <Calendar size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} />}
                        <span style={{textTransform: 'capitalize'}}>{newsList[0].type}</span>
                      </span>
                      <h3 className="news-featured-title">
                        {newsList[0].title}
                      </h3>
                      <p className="news-featured-excerpt">
                        {newsList[0].excerpt || (newsList[0].content ? newsList[0].content.substring(0, 150) + '...' : '')}
                      </p>
                      <div className="news-meta">
                        <div className="news-meta-item">
                          <Calendar size={16} />
                          {new Date(newsList[0].created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                        </div>
                        <div className="news-meta-item">
                          <User size={16} />
                          Admin Kelurahan
                        </div>
                      </div>
                    </div>
                </Link>

                <div className="news-list">
                  {newsList.slice(1).map((item, index) => (
                    <div key={item.id} className="news-card fade-in-right" style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
                      <div className="news-card-image-wrapper">
                        <Image
                          src={item.image_url || "/images/agriculture.png"}
                          alt={item.title}
                          fill
                          sizes="180px"
                          className="news-card-image"
                        />
                        <div className="news-card-date-badge">
                          <span className="day">{new Date(item.created_at).getDate()}</span>
                          <span className="month">{new Date(item.created_at).toLocaleDateString('id-ID', {month: 'short'})}</span>
                        </div>
                      </div>
                      <div className="news-card-body">
                        <span className={`news-category ${item.type === 'kegiatan' ? 'culture' : ''}`}>
                          {item.type === 'kegiatan' ? <Palette size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} /> : <Building2 size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} />}
                          <span style={{textTransform: 'capitalize'}}>{item.type}</span>
                        </span>
                        <h4 className="news-card-title">
                          {item.title}
                        </h4>
                        <p className="news-card-excerpt">
                          {item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : '')}
                        </p>
                        <Link href={`/berita/${item.id}`} className="news-read-more" style={{textDecoration: 'none'}}>
                          Baca Selengkapnya
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Belum ada berita atau kegiatan yang dipublikasikan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section map-section" id="lokasi">
        <div className="container">
          <div className="map-grid">
            <div className="map-info fade-in-left">
              <div className="section-label">
                <span className="section-label-line"></span>
                Lokasi Kami
                <span className="section-label-line"></span>
              </div>
              <h2>
                Temukan <span className="highlight">Karatuang</span>
              </h2>
              <p className="map-info-text">
                Kelurahan Karatuang terletak di Kecamatan Bantaeng, Kabupaten
                Bantaeng, Provinsi Sulawesi Selatan. Daerah ini mudah dijangkau
                melalui jalur darat dari Kota Bantaeng.
              </p>

              <div className="map-details">
                <div className="map-detail-item">
                  <div className="map-detail-icon location"><MapPin size={24} /></div>
                  <div className="map-detail-text">
                    <strong>Alamat</strong>
                    <span>
                      Kel. Karatuang, Kec. Bantaeng, Kab. Bantaeng, Sulawesi
                      Selatan
                    </span>
                  </div>
                </div>
                <div className="map-detail-item">
                  <div className="map-detail-icon area"><Map size={24} /></div>
                  <div className="map-detail-text">
                    <strong>Wilayah</strong>
                    <span>
                      Kabupaten Bantaeng, Provinsi Sulawesi Selatan, Indonesia
                    </span>
                  </div>
                </div>
                <div className="map-detail-item">
                  <div className="map-detail-icon population"><Users size={24} /></div>
                  <div className="map-detail-text">
                    <strong>Kecamatan</strong>
                    <span>Kecamatan Bantaeng</span>
                  </div>
                </div>
                <div className="map-detail-item">
                  <div className="map-detail-icon elevation"><Mountain size={24} /></div>
                  <div className="map-detail-text">
                    <strong>Topografi</strong>
                    <span>
                      Dataran rendah hingga pegunungan, ketinggian beragam
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-wrapper fade-in-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.904387946846!2d119.9489!3d-5.5485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee3c0e315a80b%3A0x4d2bc72cb21ea00!2sKaratuang%2C%20Bantaeng%2C%20Kabupaten%20Bantaeng%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1704067200000!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kelurahan Karatuang, Bantaeng"
              ></iframe>
            </div>
          </div>
        </div>
      </section>



      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content fade-in">
            <h2>Kunjungi Karatuang Sekarang</h2>
            <p>
              Rasakan sendiri keindahan alam, kehangatan masyarakat, dan pesona
              wisata yang tak terlupakan di Kelurahan Karatuang, Bantaeng.
            </p>
            <button
              className="btn-cta"
              onClick={() => scrollToSection("lokasi")}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Lihat Petunjuk Arah
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <Image
                  src="/images/bantaeng-logo.png"
                  alt="Logo Bantaeng"
                  width={48}
                  height={48}
                  className="footer-brand-logo"
                />
                <span className="footer-brand-name">Karatuang</span>
              </div>
              <p className="footer-desc">
                Website resmi Kelurahan Karatuang, Kecamatan Bantaeng, Kabupaten
                Bantaeng, Sulawesi Selatan. Menyajikan informasi wisata, sumber
                daya, dan profil kelurahan.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Navigasi</h4>
              <ul className="footer-links">
                <li>
                  <a href="#beranda" onClick={() => scrollToSection("beranda")}>
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#profil" onClick={() => scrollToSection("profil")}>
                    Profil
                  </a>
                </li>
                <li>
                  <a href="#pemerintahan" onClick={() => scrollToSection("pemerintahan")}>
                    Pemerintahan
                  </a>
                </li>
                <li>
                  <a href="#tentang" onClick={() => scrollToSection("tentang")}>
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="#wisata" onClick={() => scrollToSection("wisata")}>
                    Wisata
                  </a>
                </li>
                <li>
                  <a
                    href="#sumber-daya"
                    onClick={() => scrollToSection("sumber-daya")}
                  >
                    Sumber Daya
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Wisata</h4>
              <ul className="footer-links">
                <li>
                  <a href="#wisata">Air Terjun Bissapu</a>
                </li>
                <li>
                  <a href="#wisata">Air Terjun Erelebu</a>
                </li>
                <li>
                  <a href="#wisata">Kampung Budaya</a>
                </li>
                <li>
                  <a href="#wisata">Pegunungan</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Kontak</h4>
              <div className="footer-contact-item">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Kel. Karatuang, Kec. Bantaeng, Kab. Bantaeng, Sulawesi
                  Selatan 92411
                </span>
              </div>
              <div className="footer-contact-item">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@karatuang.bantaengkab.go.id</span>
              </div>
              <div className="footer-contact-item">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(0413) 21XXX</span>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <span>
              © 2026 Kelurahan Karatuang, Bantaeng. Hak Cipta Dilindungi.
            </span>
            <span>Dibuat dengan ❤️ untuk masyarakat Karatuang</span>
          </div>
        </div>
      </footer>
    </>
  );
}
