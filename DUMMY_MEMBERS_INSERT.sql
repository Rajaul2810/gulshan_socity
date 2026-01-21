-- Dummy Member Data Based on 11th Executive Committee
-- Execute this SQL in Supabase SQL Editor to insert 10 sample members

INSERT INTO members (
  id,
  membership_number,
  membership_type,
  status,
  membership_date,
  zone,
  name,
  email,
  mobile,
  residence_address,
  office_tel,
  residence_tel,
  designation,
  created_at,
  updated_at
) VALUES
-- 1. President
(
  gen_random_uuid(),
  '2L-01416',
  'Life',
  'active',
  '2020-01-15',
  'Zone 1',
  'Barrister Omar Sadat',
  'osadat@outlook.com',
  '01711599998',
  'House # 28 (Ground Floor), Road # 23, Gulshan-1, Dhaka',
  '9850355',
  NULL,
  'President',
  NOW(),
  NOW()
),

-- 2. Vice President
(
  gen_random_uuid(),
  '3L-02348',
  'Life',
  'active',
  '2019-03-20',
  'Zone 2',
  'Syed Almas Kabir',
  'almaskabir@gmail.com',
  '01711521964',
  'House # 25, Road # 35, Gulshan-2, Dhaka-1212',
  '8814996',
  NULL,
  'Vice President',
  NOW(),
  NOW()
),

-- 3. Vice President
(
  gen_random_uuid(),
  '1L-01493',
  'Life',
  'active',
  '2018-06-10',
  'Zone 1',
  'Israt Jahan',
  'israt1965@gmail.com',
  '01819481522',
  'Apt # B4, House# 1B, Road # 2, Gulshan, Dhaka-1212',
  NULL,
  '885-9596',
  'Vice President',
  NOW(),
  NOW()
),

-- 4. Secretary General
(
  gen_random_uuid(),
  '5L-01405',
  'Life',
  'active',
  '2019-08-25',
  'Zone 5',
  'Syed Ahsan Habib',
  'syed.habib@hotmail.com',
  '01711526355',
  'Apt# A4, House#12A, Road# 63, Gulshan, Dhaka-1212',
  '912-7905',
  '989-2853',
  'Secretary General',
  NOW(),
  NOW()
),

-- 5. Treasurer
(
  gen_random_uuid(),
  '2L-01063',
  'Life',
  'active',
  '2018-11-12',
  'Zone 2',
  'Ali Ashfaq, FCA',
  'aliashfaq1@gmail.com',
  '01713082040',
  'Rangs Waterfront, Apt# B10, House# 01, Road# 15, Gulshan, Dhaka-1212',
  '882-1877',
  '988-2625',
  'Treasurer',
  NOW(),
  NOW()
),

-- 6. Joint Secretary
(
  gen_random_uuid(),
  '2L-02566',
  'Life',
  'active',
  '2020-02-18',
  'Zone 2',
  'Mozibur Rahman Mridha',
  'mridha.ppl@gmail.com',
  '01711526185',
  'Flat # 5G, House # 22, Road # 129, Gulshan-1, Dhaka-1212',
  '8416793',
  '9898930',
  'Joint Secretary',
  NOW(),
  NOW()
),

-- 7. Joint Secretary
(
  gen_random_uuid(),
  '6G-02698',
  'Affiliate',
  'active',
  '2020-04-05',
  'Zone 6',
  'Zeenat Ameen',
  'zeenat.ameen@gmail.com',
  '01711526179',
  'House # 11, Apt. # A3, Road # 82, Gulshan-2, Dhaka-1212',
  '9892171',
  '9882118',
  'Joint Secretary',
  NOW(),
  NOW()
),

-- 8. EC Member
(
  gen_random_uuid(),
  '2L-02304',
  'Life',
  'active',
  '2019-07-30',
  'Zone 2',
  'Amb. Mosud Mannan, ndc',
  'zeta.mannan@gmail.com',
  '01711595275',
  'POLAB, 17, New Eskaton, Gaus Nagar, Dhaka-1000',
  '02223384174',
  '8114846',
  'EC Member',
  NOW(),
  NOW()
),

-- 9. Zonal Chairman Zone 1
(
  gen_random_uuid(),
  '1L-03180',
  'Life',
  'active',
  '2021-01-10',
  'Zone 1',
  'Amirul Islam Chowdhury',
  'amirul.chowdhury@gmail.com',
  '01811414438',
  'House # 4/B, Apt. # A4, Road # 02, Gulshan, Dhaka-1212',
  '9830310',
  '8837866',
  'Zonal Chairman, Zone-1',
  NOW(),
  NOW()
),

-- 10. Zonal Chairman Zone 3
(
  gen_random_uuid(),
  '3L-02341',
  'Life',
  'active',
  '2021-03-15',
  'Zone 3',
  'Khaled Shams',
  'khaled.shams@gmail.com',
  '01711520007',
  'House # 25, Apt # C4, Road # 35, Gulshan, Dhaka-1212',
  NULL,
  NULL,
  'Zonal Chairman, Zone-3',
  NOW(),
  NOW()
)
ON CONFLICT (membership_number) DO NOTHING;
