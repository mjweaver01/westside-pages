export interface Product {
  id: string
  title: string
  url: string
  price: number
  compareAtPrice?: number
  featuredImage: {
    src: string
    alt: string
    aspectRatio: number
  }
  // Optional badges/flair
  badges?: string[]
}

export interface ProductSliderSettings {
  title: string
  backgroundColor?: string
  addBoxShadow: boolean
  productLimit: number
  shopLinkText: string
  primaryButton: boolean
  collection?: string
}
