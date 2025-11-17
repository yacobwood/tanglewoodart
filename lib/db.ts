/**
 * Simple JSON File Database Helpers
 * For managing artworks and orders in JSON files
 */

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ARTWORKS_FILE = path.join(DATA_DIR, 'artworks.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Read artworks from JSON file
 */
export async function readArtworks(): Promise<any[]> {
  try {
    const data = await fs.readFile(ARTWORKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading artworks:', error);
    return [];
  }
}

/**
 * Write artworks to JSON file
 */
export async function writeArtworks(artworks: any[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(ARTWORKS_FILE, JSON.stringify(artworks, null, 2), 'utf-8');
}

/**
 * Get artwork by ID
 */
export async function getArtworkById(id: string): Promise<any | null> {
  const artworks = await readArtworks();
  return artworks.find((art) => art.id === id) || null;
}

/**
 * Add new artwork
 */
export async function addArtwork(artwork: any): Promise<any> {
  const artworks = await readArtworks();

  // Check if ID already exists
  if (artworks.some((art) => art.id === artwork.id)) {
    throw new Error('Artwork with this ID already exists');
  }

  artworks.push(artwork);
  await writeArtworks(artworks);
  return artwork;
}

/**
 * Update artwork by ID
 */
export async function updateArtwork(id: string, updates: any): Promise<any | null> {
  const artworks = await readArtworks();
  const index = artworks.findIndex((art) => art.id === id);

  if (index === -1) {
    return null;
  }

  artworks[index] = { ...artworks[index], ...updates };
  await writeArtworks(artworks);
  return artworks[index];
}

/**
 * Delete artwork by ID
 */
export async function deleteArtwork(id: string): Promise<boolean> {
  const artworks = await readArtworks();
  const filteredArtworks = artworks.filter((art) => art.id !== id);

  if (filteredArtworks.length === artworks.length) {
    return false; // Artwork not found
  }

  await writeArtworks(filteredArtworks);
  return true;
}

/**
 * Toggle artwork availability
 */
export async function toggleArtworkAvailability(id: string): Promise<any | null> {
  const artwork = await getArtworkById(id);
  if (!artwork) {
    return null;
  }

  const newAvailability = !artwork.available;
  return updateArtwork(id, { available: newAvailability });
}

/**
 * Read orders from JSON file
 */
export async function readOrders(): Promise<any[]> {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

/**
 * Write orders to JSON file
 */
export async function writeOrders(orders: any[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

/**
 * Add new order
 */
export async function addOrder(order: any): Promise<any> {
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
  return order;
}

/**
 * Get order by ID
 */
export async function getOrderById(id: string): Promise<any | null> {
  const orders = await readOrders();
  return orders.find((order) => order.id === id) || null;
}

/**
 * Get order by Stripe session ID
 */
export async function getOrderBySessionId(sessionId: string): Promise<any | null> {
  const orders = await readOrders();
  return orders.find((order) => order.stripeSessionId === sessionId) || null;
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, status: string): Promise<any | null> {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return null;
  }

  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();

  if (status === 'confirmed') {
    orders[index].paidAt = new Date().toISOString();
  }

  await writeOrders(orders);
  return orders[index];
}
