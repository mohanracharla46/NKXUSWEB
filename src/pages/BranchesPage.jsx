import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Phone, Mail, Search, Globe, Filter } from 'lucide-react';

const BRANCH_LOCATIONS = [
  // 1. Andhra Pradesh
  {
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    name: 'MVP Colony',
    address: 'Bharath Towers, 5th Lane, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh – 530016',
    phone: '+91 99999 00001',
    email: 'vizag@nkxus.com'
  },
  {
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    name: 'Benz Circle',
    address: '59-14-1, Opposite Hiwaga, Beside CSB Bank, Vasvya Nagar, Krishna Nagar, Vijayawada, Andhra Pradesh – 520008',
    phone: '+91 99999 00002',
    email: 'vijayawada@nkxus.com'
  },
  // 2. Telangana
  {
    state: 'Telangana',
    city: 'Hyderabad',
    name: 'Kondapur',
    address: '1st Floor, Plot No. 656, Road No. 36, Survey of India, Ayyappa Society, Chanda Naik Nagar, Madhapur, Hyderabad, Telangana – 500081',
    phone: '+91 99999 00003',
    email: 'hyd.kp@nkxus.com'
  },
  {
    state: 'Telangana',
    city: 'Hyderabad',
    name: 'Jubilee Hills',
    address: 'Hansa Plaza, Road No. 36, CBI Colony, Jubilee Hills, Hyderabad, Telangana – 500033',
    phone: '+91 99999 00004',
    email: 'hyd.jh@nkxus.com'
  },
  {
    state: 'Telangana',
    city: 'Hyderabad',
    name: 'Hitech City',
    address: 'Shop No. 2, T. M. Yadav Gokul Plaza, Gachibowli Flyover, Rajiv Gandhi Nagar, Gachibowli, Hyderabad, Telangana – 500032',
    phone: '+91 99999 00005',
    email: 'hyd.hc@nkxus.com'
  },
  // 3. Karnataka
  {
    state: 'Karnataka',
    city: 'Bengaluru',
    name: 'Koramangala',
    address: '29, 3rd Cross Road, Near Sony World Signal, Venkappa Garden, Venkata Reddy Layout, 6th Block, Koramangala, Bengaluru, Karnataka – 560095',
    phone: '+91 99999 00006',
    email: 'blr.km@nkxus.com'
  },
  {
    state: 'Karnataka',
    city: 'Bengaluru',
    name: 'HSR Layout',
    address: '3rd Floor, 435, 27th Main Road, 1st Sector, HSR Layout, Bengaluru, Karnataka – 560102',
    phone: '+91 99999 00007',
    email: 'blr.hsr@nkxus.com'
  },
  {
    state: 'Karnataka',
    city: 'Bengaluru',
    name: 'Indira Nagar',
    address: '19th Main Road, A Block, Milk Colony, 2nd Stage, Rajajinagar, Bengaluru, Karnataka',
    phone: '+91 99999 00008',
    email: 'blr.in@nkxus.com'
  },
  {
    state: 'Karnataka',
    city: 'Bengaluru',
    name: 'Whitefield',
    address: '4th Floor, 32/1, NCPR Layout, Doddanekundi, Whitefield, Near ITPL Main Road, Mahadevapura, Bengaluru, Karnataka – 560048',
    phone: '+91 99999 00009',
    email: 'blr.wf@nkxus.com'
  },
  // 4. Tamil Nadu
  {
    state: 'Tamil Nadu',
    city: 'Chennai',
    name: 'OMR',
    address: 'First Floor, F3, No. 4/608, VOC Street, Near Turyaa Hotel, OMR, Kottivakkam, Chennai, Tamil Nadu – 600096',
    phone: '+91 99999 00010',
    email: 'chennai.omr@nkxus.com'
  },
  {
    state: 'Tamil Nadu',
    city: 'Chennai',
    name: 'Velachery',
    address: 'No. 12, Ground Floor, 1st Cross Street, Lakshmi Nagar, Velachery, Chennai, Tamil Nadu – 600042',
    phone: '+91 99999 00011',
    email: 'chennai.vel@nkxus.com'
  },
  {
    state: 'Tamil Nadu',
    city: 'Chennai',
    name: 'Anna Nagar',
    address: '3rd Floor, VR Mall Building, Anna Nagar, Chennai, Tamil Nadu – 600096',
    phone: '+91 99999 00012',
    email: 'chennai.an@nkxus.com'
  },
  {
    state: 'Tamil Nadu',
    city: 'Coimbatore',
    name: 'Avinashi Road',
    address: 'Avinashi Road, Near Goldwins, Coimbatore, Tamil Nadu – 641014',
    phone: '+91 99999 00013',
    email: 'coimbatore@nkxus.com'
  },
  // 5. Kerala
  {
    state: 'Kerala',
    city: 'Kochi',
    name: 'Kakkanad',
    address: 'Carnival Infopark Phase I, Room No. 15, Infopark TBC, 4th Floor, Thapasya Building, Kakkanad, Kochi, Kerala – 682042',
    phone: '+91 99999 00014',
    email: 'kochi.kk@nkxus.com'
  },
  {
    state: 'Kerala',
    city: 'Kochi',
    name: 'Infopark Area',
    address: 'Carnival Infopark Phase I, Room No. 15, Infopark TBC, 4th Floor, Thapasya Building, Kakkanad, Kochi, Kerala – 682042',
    phone: '+91 99999 00015',
    email: 'kochi.ip@nkxus.com'
  },
  {
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    name: 'Technopark Area',
    address: 'No. 3/63-1, Technopark Trivandrum, Technopark Campus, Thiruvananthapuram, Kerala – 695582',
    phone: '+91 99999 00016',
    email: 'tvm@nkxus.com'
  },
  // 6. Maharashtra
  {
    state: 'Maharashtra',
    city: 'Mumbai',
    name: 'Andheri East (90 Feet Rd)',
    address: '90 Feet Road, Andheri–Kurla Road, Near Sarvasiddhikar Ganesh Temple, Satya Nagar, Saki Naka, Mumbai, Maharashtra – 400072',
    phone: '+91 99999 00017',
    email: 'mumbai.ae@nkxus.com'
  },
  {
    state: 'Maharashtra',
    city: 'Mumbai',
    name: 'Andheri East (Naman Midtown)',
    address: 'B-307, Naman Midtown, Senapati Bapat Marg, Prabhadevi, Mumbai, Maharashtra – 400013',
    phone: '+91 99999 00018',
    email: 'mumbai.nm@nkxus.com'
  },
  {
    state: 'Maharashtra',
    city: 'Pune',
    name: 'Hinjawadi',
    address: 'Xion Mall, 3rd Floor, Office No. 333, Hinjewadi–Wakad Road, Behind D-Mart, Hinjawadi, Maharashtra – 411057',
    phone: '+91 99999 00019',
    email: 'pune.hw@nkxus.com'
  },
  {
    state: 'Maharashtra',
    city: 'Pune',
    name: 'Viman Nagar',
    address: '1st Floor, 8 Biz Park, Mahad Colony, Viman Nagar, Pune, Maharashtra – 411014',
    phone: '+91 99999 00020',
    email: 'pune.vn@nkxus.com'
  },
  {
    state: 'Maharashtra',
    city: 'Nagpur',
    name: 'Dharampeth',
    address: 'Plot 1/A/K, Beside Gajanan Primary School, Ayodhya Nagar, Nagpur, Maharashtra – 440024',
    phone: '+91 99999 00021',
    email: 'nagpur@nkxus.com'
  },
  // 7. Gujarat
  {
    state: 'Gujarat',
    city: 'Ahmedabad',
    name: 'SG Highway',
    address: '1002, Ganesh Glory, Near BSNL Office, Chainpur Road, Jagatpur, Sarkhej–Gandhinagar Highway, Ahmedabad, Gujarat – 382470',
    phone: '+91 99999 00022',
    email: 'ahmd.sg@nkxus.com'
  },
  {
    state: 'Gujarat',
    city: 'Ahmedabad',
    name: 'Prahlad Nagar',
    address: 'B-707, Mondeal Square, Sarkhej–Gandhinagar Highway, Prahlad Nagar, Ahmedabad, Gujarat – 380015',
    phone: '+91 99999 00023',
    email: 'ahmd.pn@nkxus.com'
  },
  {
    state: 'Gujarat',
    city: 'Surat',
    name: 'Vesu',
    address: 'A-424, 4th Floor, The Grand Plaza, VIP Road, Vesu, Surat, Gujarat – 395007',
    phone: '+91 99999 00024',
    email: 'surat@nkxus.com'
  },
  // 8. Rajasthan
  {
    state: 'Rajasthan',
    city: 'Jaipur',
    name: 'Malviya Nagar',
    address: 'D-30, Jagatpura Road, Roopvihar Colony, Block D, Siddharth Nagar, Malviya Nagar, Jaipur, Rajasthan – 302017',
    phone: '+91 99999 00025',
    email: 'jaipur.mn@nkxus.com'
  },
  {
    state: 'Rajasthan',
    city: 'Jaipur',
    name: 'Vaishali Nagar',
    address: 'C-55, Gokul Path, Block C, Vaishali Nagar, Jaipur, Rajasthan – 302021',
    phone: '+91 99999 00026',
    email: 'jaipur.vn@nkxus.com'
  },
  // 9. Madhya Pradesh
  {
    state: 'Madhya Pradesh',
    city: 'Indore',
    name: 'Vijay Nagar',
    address: '2nd Floor, Swaraj Enterprises, Ubikon Technologies Pvt. Ltd., Above Table World, Behind C21 Mall, Vijay Nagar, Indore, Madhya Pradesh – 452010',
    phone: '+91 99999 00027',
    email: 'indore.vn@nkxus.com'
  },
  {
    state: 'Madhya Pradesh',
    city: 'Indore',
    name: 'AB Road',
    address: '616, Madina Nagar, Azad Nagar, Indore, Madhya Pradesh – 452001',
    phone: '+91 99999 00028',
    email: 'indore.ab@nkxus.com'
  },
  {
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    name: 'MP Nagar',
    address: 'Plot No. 65, 1st Floor, Opposite Hotel Atishay, Chetak Bridge, Zone 1, Maharana Pratap Nagar, Bhopal, Madhya Pradesh – 462011',
    phone: '+91 99999 00029',
    email: 'bhopal@nkxus.com'
  },
  // 10. Uttar Pradesh
  {
    state: 'Uttar Pradesh',
    city: 'Noida',
    name: 'Sector 2',
    address: 'D Block, Sector 2, Noida, Uttar Pradesh',
    phone: '+91 99999 00030',
    email: 'noida.s2@nkxus.com'
  },
  {
    state: 'Uttar Pradesh',
    city: 'Noida',
    name: 'Sector 62',
    address: 'Tower C, Ithum Tower, 202–203, Sector 62, Noida, Uttar Pradesh – 201301',
    phone: '+91 99999 00031',
    email: 'noida.s62@nkxus.com'
  },
  {
    state: 'Uttar Pradesh',
    city: 'Noida',
    name: 'Sector 63',
    address: '242, D Block, Sector 63, Noida, Uttar Pradesh – 201309',
    phone: '+91 99999 00032',
    email: 'noida.s63@nkxus.com'
  },
  {
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    name: 'Gomti Nagar',
    address: 'A Square Building, D-52, Near Ola Office, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010',
    phone: '+91 99999 00033',
    email: 'lucknow@nkxus.com'
  },
  // 11. Punjab
  {
    state: 'Punjab',
    city: 'Mohali',
    name: 'Sector 74',
    address: '2nd Floor, Plot No. D180C, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab – 140307',
    phone: '+91 99999 00034',
    email: 'mohali.s74@nkxus.com'
  },
  {
    state: 'Punjab',
    city: 'Mohali',
    name: 'IT City',
    address: 'Office F338, 401, 4th Floor, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab – 160055',
    phone: '+91 99999 00035',
    email: 'mohali.it@nkxus.com'
  },
  {
    state: 'Punjab',
    city: 'Ludhiana',
    name: 'Ferozepur Road',
    address: 'Nanda Square, Between PAU Gates 2 and 3, Ferozepur Road, Ludhiana, Punjab – 141001',
    phone: '+91 99999 00036',
    email: 'ludhiana@nkxus.com'
  },
  // 12. Haryana
  {
    state: 'Haryana',
    city: 'Gurugram',
    name: 'Cyber City',
    address: 'U49, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana – 122002',
    phone: '+91 99999 00037',
    email: 'ggn.cyber@nkxus.com'
  },
  {
    state: 'Haryana',
    city: 'Gurugram',
    name: 'Golf Course Road',
    address: 'DLF The Camellias, Golf Course Road, DLF Phase 5, Sector 42, Gurugram, Haryana – 122009',
    phone: '+91 99999 00038',
    email: 'ggn.golf@nkxus.com'
  },
  // 13. West Bengal
  {
    state: 'West Bengal',
    city: 'Kolkata',
    name: 'Salt Lake Sector V',
    address: 'Salt Lake Electronics Complex, EP Block, Sector V, Bidhannagar, Kolkata, West Bengal – 700091',
    phone: '+91 99999 00039',
    email: 'kol.sl@nkxus.com'
  },
  {
    state: 'West Bengal',
    city: 'Kolkata',
    name: 'New Town',
    address: 'Unit 241, PS Abacus Building, Diplomatic Enclave, Action Area IIE, Reckjoani, New Town, West Bengal – 700161',
    phone: '+91 99999 00040',
    email: 'kol.nt@nkxus.com'
  },
  // 14. Odisha
  {
    state: 'Odisha',
    city: 'Bhubaneswar',
    name: 'Patia',
    address: 'DLF Cyber City, Infocity, Patia, Bhubaneswar, Odisha – 751024',
    phone: '+91 99999 00041',
    email: 'bbsr.patia@nkxus.com'
  },
  {
    state: 'Odisha',
    city: 'Bhubaneswar',
    name: 'Infocity',
    address: 'Mark2fashion Tech, Bhubaneswar, Odisha',
    phone: '+91 99999 00042',
    email: 'bbsr.info@nkxus.com'
  },
  // 15. Assam
  {
    state: 'Assam',
    city: 'Guwahati',
    name: 'GS Road',
    address: '05, 3rd Floor, GS Road, Ananda Nagar, Christian Basti, Guwahati, Assam',
    phone: '+91 99999 00043',
    email: 'guwahati@nkxus.com'
  }
];

export default function BranchesPage() {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract all unique states
  const statesList = useMemo(() => {
    const states = new Set(BRANCH_LOCATIONS.map(b => b.state));
    return ['All', ...Array.from(states).sort()];
  }, []);

  // Extract cities based on selected state
  const citiesList = useMemo(() => {
    const filtered = selectedState === 'All' 
      ? BRANCH_LOCATIONS 
      : BRANCH_LOCATIONS.filter(b => b.state === selectedState);
    const cities = new Set(filtered.map(b => b.city));
    return ['All', ...Array.from(cities).sort()];
  }, [selectedState]);

  // Reset city filter if selected state changes
  useEffect(() => {
    setSelectedCity('All');
  }, [selectedState]);

  // Filtered branches
  const filteredBranches = useMemo(() => {
    return BRANCH_LOCATIONS.filter(b => {
      const matchState = selectedState === 'All' || b.state === selectedState;
      const matchCity = selectedCity === 'All' || b.city === selectedCity;
      const matchSearch = searchQuery.trim() === '' || 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchCity && matchSearch;
    });
  }, [selectedState, selectedCity, searchQuery]);

  return (
    <div style={{
      padding: '160px 24px 100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-primary)',
      minHeight: '80vh'
    }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>GLOBAL NETWORK</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          NKXUS <br />
          <span className="text-gradient">Branches.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Our operations cover India's premier technology nodes, ensuring responsive, high-fidelity developer alignment across domains.
        </p>
      </header>

      {/* Filter Controls Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '40px',
        padding: '24px',
        borderRadius: '16px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
        alignItems: 'center'
      }}>
        {/* Search input */}
        <div style={{
          flex: '2 1 300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search branches by location or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        {/* State select */}
        <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All States</option>
            {statesList.filter(s => s !== 'All').map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City select */}
        <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Cities</option>
            {citiesList.filter(c => c !== 'All').map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {filteredBranches.length > 0 ? (
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredBranches.map((b, idx) => (
            <div key={idx} style={{
              padding: '32px',
              borderRadius: '16px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}>
              <div>
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  {b.state} • {b.city}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '600', marginBottom: '6px' }}>{b.name}</h3>
              </div>
              
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{b.address}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                  <span>+91 91604 42065 / +91 91604 42066</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                  <span>info@nkxus.com / nkxus.com@gmail.com</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '16px' }}>No branch offices found matching your filter selection.</p>
        </div>
      )}
    </div>
  );
}
