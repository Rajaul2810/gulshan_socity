/** Photo paths for 12th Executive Committee members (from /public/12thecofgspictures). */
const PHOTO_DIR = '/12thecofgspictures'

const filesByMembership: Record<string, string> = {
  '2L-01416': '2L-01416 Barrister Omar Sadat Copy.jpg',
  '5L-01434': '5L-01434 Bir Muktijoddha Capt. Abdul Majed Miah.jpg',
  '1L-01462': '1L-01462EvaRahman.jpg',
  '2L-02566': '2L-02566 Mozibur Rahman Mridha.jpg',
  '2L-01063': '2L-01063 Ali Ashfaq, FCA (12.08.2026).jpeg',
  '5L-02524': '5L-02524 Khadem Md. Raiyan Sadid.jpg',
  '5L-03379': '5L-03379 Joya Kabir.jpg',
  '4L-02209': '4L-02209 Mahfuzul Azam Romel.jpg',
  '5L-02771': '5L-02771 Faizur Rahman Khan.jpg',
  '1L-03180': '1L-03180 Amirul Islam Chowdhury.jpeg',
  '6L-03788': '6L-03788 Regina Nasser.jpg',
  '6L-04264': '6L-04264 Farzanah Chowdhury.jpg',
  '1L-01325': '1L-01325Iftekhar Rahman.jpg',
  '1L-03207': '1L-03207 Imtiaz Mohammed Mohsin.jpg',
  '2L-02304': 'Amb. Mosud Mannan, ndc.jpeg',
  '3L-04158': '3L-04158 Barrister Quamrun Nahar Mahmud.jpg',
  '4L-03370': '4L-03370 Morshedul Alam Chaklader.jpg',
  '5L-03839': '5L-03839 Pulak Podder.jpg',
  '6L-03635': '6L-03635 Dr. Zafrul Islam.jpg',
}

export function getEc12Photo(membershipNo: string | undefined | null): string | null {
  if (!membershipNo) return null
  const file = filesByMembership[membershipNo]
  if (!file) return null
  return encodeURI(`${PHOTO_DIR}/${file}`)
}
