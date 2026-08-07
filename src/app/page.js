"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Leaf, Mountain, Wheat, Palette, Droplet, Waves, Trees, Coffee, Bird, PartyPopper, Building2, Calendar, User, Users, ArrowRight, MapPin, Map, Target, Flag, Network, UserCheck } from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [galeriList, setGaleriList] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const supabase = createClient();
    async function fetchData() {
      const { data: newsData } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      if (newsData) setNewsList(newsData);
      
      const { data: galeriData } = await supabase
        .from('galeri')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      if (galeriData) setGaleriList(galeriData);
    }
    fetchData();
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
  }, [newsList, galeriList]);

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
              <a href="#galeri" onClick={() => scrollToSection("galeri")}>
                Galeri
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

        <a href="#pemerintahan" onClick={() => scrollToSection("pemerintahan")}>
          Pemerintahan
        </a>
        <a href="#tentang" onClick={() => scrollToSection("tentang")}>
          Tentang
        </a>

        <a href="#sumber-daya" onClick={() => scrollToSection("sumber-daya")}>
          Sumber Daya
        </a>
        <a href="#berita" onClick={() => scrollToSection("berita")}>
          Berita
        </a>
        <a href="#galeri" onClick={() => scrollToSection("galeri")}>
          Galeri
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
              Selamat Datang di Portal Resmi
              <br />
              Kelurahan <span className="highlight">Karatuang</span>
            </h1>

            <p className="hero-subtitle">
              Pusat informasi dan pelayanan masyarakat. Jelajahi potensi alam, kekayaan budaya, serta kabar terbaru dari Kelurahan Karatuang, Kabupaten Bantaeng.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">12.5</div>
                <div className="hero-stat-label">Luas Wilayah</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">2,700+</div>
                <div className="hero-stat-label">Penduduk</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">22/6</div>
                <div className="hero-stat-label">RT/RW</div>
              </div>
            </div>

            <div className="hero-buttons">

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
                src="/images/Pertanian2.jpeg"
                alt="Padi"
                width={600}
                height={450}
                className="hero-main-image"
                priority
              />
            </div>
            <div className="hero-float-card">
              <div className="hero-float-icon green"><Leaf size={24} /></div>
              <div className="hero-float-text">
                <strong>Potensi Alam</strong>
                <span>Kekayaan agrikultur dan perkebunan</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* PEMERINTAHAN SECTION */}
      <section className="section section-alt" id="pemerintahan">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Pusat Pengaduan
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">
              Struktur 3 Pilar <span className="highlight">Karatuang</span>
            </h2>
            <p className="section-description">
              Pusat pengaduan melalui struktur 3 pilar Kelurahan Karatuang. Apabila ada kejadian atau permasalahan sosial segera laporkan kesini.
            </p>
          </div>

          <div className="org-chart" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem', width: '100%' }}>
            
            {/* Pillar 1: Bhabinkamtibmas */}
            <div className="org-node fade-in" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'var(--primary-gradient)', padding: '1rem', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                BHABINKAMTIBMAS
              </div>
              <div style={{ backgroundColor: 'var(--primary-dark)', padding: '1rem', color: 'var(--text-light)', textAlign: 'left', flexGrow: 1 }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>NAMA &nbsp; :</strong> AIPDA ARWAN HAMID</div>
                <div><strong>TLP/WA :</strong> 0852-4051-0379</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ width: '150px', height: '200px', backgroundColor: 'var(--bg-tertiary)', border: '4px solid white', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', position: 'relative', overflow: 'hidden' }}>
                  <Image src="/images/BHABINKAMTIBMAS.png" alt="Bhabinkamtibmas" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            {/* Pillar 2: Kepala Lurah */}
            <div className="org-node fade-in" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', transitionDelay: '0.1s' }}>
              <div style={{ background: 'var(--primary-gradient)', padding: '1rem', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                KEPALA LURAH
              </div>
              <div style={{ backgroundColor: 'var(--primary-dark)', padding: '1rem', color: 'var(--text-light)', textAlign: 'left', flexGrow: 1 }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>NAMA &nbsp; :</strong> IRWAN ARFANDI, S. E.</div>
                <div><strong>TLP/WA :</strong> 0823-4458-1571</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ width: '150px', height: '200px', backgroundColor: 'var(--bg-tertiary)', border: '4px solid white', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', position: 'relative', overflow: 'hidden' }}>
                  <Image src="/images/LURAH.png" alt="Kepala Lurah" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            {/* Pillar 3: Babinsa */}
            <div className="org-node fade-in" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', transitionDelay: '0.2s' }}>
              <div style={{ background: 'var(--primary-gradient)', padding: '1rem', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                BABINSA
              </div>
              <div style={{ backgroundColor: 'var(--primary-dark)', padding: '1rem', color: 'var(--text-light)', textAlign: 'left', flexGrow: 1 }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>NAMA &nbsp; :</strong> SERKA ABD. MAJID</div>
                <div><strong>TLP/WA :</strong> 0853-4197-7267</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ width: '150px', height: '200px', backgroundColor: 'var(--bg-tertiary)', border: '4px solid white', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', position: 'relative', overflow: 'hidden' }}>
                  <Image src="/images/BABINSA.png" alt="Babinsa" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="fade-in" style={{ marginTop: '3rem', backgroundColor: 'var(--bg-card)', color: 'var(--primary)', border: '3px solid var(--primary)', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', textAlign: 'center', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: 'var(--shadow-md)' }}>
            APABILA ADA KEJADIAN / PERMASALAHAN SOSIAL SEGERA LAPORKAN KESINI
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
                  src="/images/bantaeng-logo.png"
                  alt="Karatuang"
                  width={600}
                  height={420}
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
                sangat asri, dengan hamparan pegunungan hijau dan udara yang sejuk.
              </p>
              <p className="about-text">
                Masyarakat Karatuang sebagian besar bermata pencaharian di
                bidang pertanian, perkebunan, dan peternakan. Kearifan lokal
                masyarakat yang masih terjaga menjadikan Karatuang menarik untuk dikunjungi.
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
                  src="/images/Pertanian1.jpeg"
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
                  jagung, dan berbagai tanaman pangan. Sawah
                  terasering menjadi pemandangan khas daerah ini.
                </p>
                <div className="resource-card-tags">
                  <span className="resource-tag">Padi</span>
                  <span className="resource-tag">Jagung</span>
                </div>
              </div>
            </div>

            <div className="resource-card fade-in" style={{ transitionDelay: "0.2s" }}>
              <div className="resource-card-image-wrapper">
                <Image
                  src="/images/cengkeh.jpg"
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
                  Dataran tinggi Karatuang ideal untuk perkebunan cengkeh dan mangga. Hasil perkebunan menjadi komoditas utama ekspor daerah.
                </p>
                <div className="resource-card-tags">
                  <span className="resource-tag">Mangga</span>
                  <span className="resource-tag">Cengkeh</span>
                </div>
              </div>
            </div>

            <div className="resource-card fade-in" style={{ transitionDelay: "0.3s" }}>
              <div className="resource-card-image-wrapper">
                <Image
                  src="/images/peternakan.jpg"
                  alt="Peternakan Karatuang"
                  width={400}
                  height={200}
                  className="resource-card-image"
                />
                <div className="resource-card-icon-badge"><Bird size={24} /></div>
              </div>
              <div className="resource-card-body">
                <h3 className="resource-card-title">Peternakan</h3>
                <p className="resource-card-desc">
                  Masyarakat Karatuang juga aktif dalam sektor peternakan. Sektor ini mendukung ketahanan pangan lokal.
                </p>
                <div className="resource-card-tags">
                  <span className="resource-tag">Ayam</span>
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

      {/* GALLERY SECTION */}
      <section className="section" id="galeri">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-line"></span>
              Galeri Foto
              <span className="section-label-line"></span>
            </div>
            <h2 className="section-title">Potret Karatuang</h2>
            <p className="section-description">
              Kumpulan foto yang merekam keindahan alam, kegiatan masyarakat, dan momen penting di Kelurahan Karatuang.
            </p>
          </div>

          <div className="gallery-masonry">
            {galeriList.length > 0 ? (
              galeriList.map((item, index) => (
                <div key={item.id} className="gallery-item fade-in" style={{ transitionDelay: `${(index % 6) * 0.1}s` }}>
                  <img
                    src={item.image_url}
                    alt={item.title || `Galeri Karatuang ${index + 1}`}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                Belum ada foto galeri.
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/galeri" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Lihat Semua Galeri <ArrowRight size={20} />
            </Link>
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
              Rasakan sendiri keindahan alam dan kehangatan masyarakat yang tak terlupakan di Kelurahan Karatuang, Bantaeng.
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
                Bantaeng, Sulawesi Selatan. Menyajikan informasi sumber daya alam, dan profil kelurahan.
              </p>
              <div className="footer-social">
                <a href="https://www.instagram.com/kelurahankaratuang" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
                  <a href="#galeri" onClick={() => scrollToSection("galeri")}>
                    Galeri
                  </a>
                </li>
                <li>
                  <a href="#lokasi" onClick={() => scrollToSection("lokasi")}>
                    Lokasi
                  </a>
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
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>@kelurahankaratuang</span>
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
                <span>0823-4458-1571</span>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <span>
              © 2026 Kelurahan Karatuang, Bantaeng. Hak Cipta Dilindungi.
            </span>
            <span>Dibuat oleh Mahasiswa KKN Unhas Gelombang 116 untuk Masyarakat Karatuang</span>
          </div>
        </div>
      </footer>
    </>
  );
}
