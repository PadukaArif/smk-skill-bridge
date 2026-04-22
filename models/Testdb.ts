import mongoose, { Schema, model, models } from 'mongoose';

const LombaSchema = new Schema({
  namaLomba: { type: String, required: true },
  deskripsi: String,
  peserta: Number,
  createdAt: { type: Date, default: Date.now },
});

// Ini penting: Next.js sering hot-reload, jadi kita cek dulu modelnya sudah ada atau belum
const Lomba = models.Lomba || model('Lomba', LombaSchema);
export default Lomba;