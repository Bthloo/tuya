import { supabase } from '../lib/supabase'

export async function getCategoriesWithProducts() {
  // 1. هات كل الكاتيجوريز مرتبة
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, slug, name, sort_order')
    .order('sort_order', { ascending: true })

  if (catError) throw catError

  // 2. هات كل المنتجات مع صورها
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(storage_path, sort_order)
    `)
    .eq('is_active', true)

  if (prodError) throw prodError

  // 3. اربط كل كاتيجوري بالمنتجات بتاعتها
  return categories.map((cat) => ({
    slug: cat.slug,
    name: cat.name, // { en: "...", tr: "..." }
    products: products.filter((p) => p.category_id === cat.id),
  }))
}

export async function getBestSellers() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(storage_path, sort_order)
    `)
    .eq('is_best_seller', true)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(storage_path, sort_order)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}