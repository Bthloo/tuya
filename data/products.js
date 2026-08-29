import { supabase } from '../lib/supabase'

export const categories = ["chocolate", "baklava", "candy", "cakes"];

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

export async function getProductsByCategory(categorySlug) {

  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (catError) {
    console.log('CATEGORY ERROR:', catError)
    return []
  }

  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(storage_path, sort_order)
    `)
    .eq('category_id', category.id)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export async function getAllProductsGrouped() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(slug),
      images:product_images(storage_path, sort_order)
    `)
    .eq('is_active', true)

  if (error) throw error

  const grouped = {}
  data.forEach((product) => {
    const slug = product.category?.slug
    if (!slug) return
    if (!grouped[slug]) grouped[slug] = []
    grouped[slug].push(product)
  })

  return grouped
}