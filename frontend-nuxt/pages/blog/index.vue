<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar />
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />

      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Blog de Mudanzas y Portes
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Blog PortesPro
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Guías, consejos e información sobre mudanzas, portes y servicios de transporte en la Costa del Sol
            </p>
          </div>
        </div>
      </section>

      <!-- Blog Posts Grid -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div v-if="pending" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <p class="mt-4 text-slate-500">Cargando artículos...</p>
          </div>

          <div v-else-if="error" class="text-center py-20">
            <p class="text-red-600">Error al cargar los artículos</p>
          </div>

          <div v-else-if="posts && posts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <article
              v-for="post in posts"
              :key="post._path || post.path || post.title"
              class="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <NuxtLink 
                :to="`/blog/${getBlogSlug(post)}`" 
                class="block"
                @click="handlePostClick(post, $event)"
              >
                <div class="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    v-if="post.image"
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-teal-600 to-slate-900 flex items-center justify-center"
                  >
                    <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>

                <div class="p-6">
                  <div class="flex items-center gap-3 mb-3">
                    <time :datetime="post.date" class="text-xs font-black text-teal-600 uppercase tracking-wider">
                      {{ formatDate(post.date) }}
                    </time>
                    <span v-if="post.category" class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {{ post.category }}
                    </span>
                  </div>

                  <h2 class="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-teal-600 transition-colors">
                    {{ post.title }}
                  </h2>

                  <p v-if="post.description" class="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {{ post.description }}
                  </p>

                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-teal-600 group-hover:text-teal-700 transition-colors">
                      Leer más →
                    </span>
                    <span v-if="post.author" class="text-xs text-slate-400">
                      Por {{ post.author }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>

          <div v-else class="text-center py-20">
            <p class="text-slate-500">No hay artículos disponibles</p>
          </div>
        </div>
      </section>

      <PortesFooter />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lang = ref('es')

const { data: postsData, pending, error } = await useAsyncData('blog-posts', async () => {
  try {
    const allContent = await queryCollection('content').all()
    // Filtrar solo los posts del blog y ordenar por fecha
    if (allContent && Array.isArray(allContent)) {
      const blogPosts = allContent
        .filter(item => {
          const path = item._path || item.path || ''
          return path.startsWith('/blog/') && path !== '/blog/'
        })
        .sort((a, b) => {
          const dateA = new Date(a.date || 0)
          const dateB = new Date(b.date || 0)
          return dateB - dateA
        })
      return blogPosts
    }
    return []
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    return []
  }
})

const posts = computed(() => postsData.value || [])

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Función para obtener el slug del artículo desde su path
const getBlogSlug = (post) => {
  console.log('🔍 getBlogSlug llamado con post:', post)
  if (!post) {
    console.log('⚠️ getBlogSlug: post no existe')
    return ''
  }
  
  // Intentar obtener el path de diferentes formas
  const path = post._path || post.path || post.id || ''
  console.log('🔍 getBlogSlug: path obtenido', path, 'Keys del post:', Object.keys(post))
  
  if (!path) {
    console.log('⚠️ getBlogSlug: path no existe', { post, _path: post?._path, path: post?.path })
    return ''
  }
  
  // El path viene como /blog/2026-01-15-empresas-mudanzas-costa-del-sol
  // Necesitamos extraer solo el slug: 2026-01-15-empresas-mudanzas-costa-del-sol
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '')
    console.log('✅ getBlogSlug: slug extraído', slug)
    return slug
  }
  
  // Si el path no empieza con /blog/, intentar extraer el nombre del archivo
  const pathParts = path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  console.log('⚠️ getBlogSlug: usando último segmento del path', lastPart)
  return lastPart || path.replace(/^\/blog/, '')
}

// Función para manejar el click en el artículo
const handlePostClick = (post, event) => {
  console.log('🖱️ Click en artículo (Leer más):', {
    post,
    title: post?.title,
    _path: post?._path,
    path: post?.path,
    slug: getBlogSlug(post),
    event,
    target: event?.target
  })
}

// Función para manejar el click en el título
const handleTitleClick = (post, event) => {
  console.log('🖱️ Click en título del artículo:', {
    post,
    title: post?.title,
    _path: post?._path,
    path: post?.path,
    slug: getBlogSlug(post),
    event,
    target: event?.target
  })
}

// SEO Meta Tags
const siteUrl = 'https://portespro.es'
const currentUrl = `${siteUrl}/blog`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Blog de Mudanzas y Portes | Guías y Consejos | PortesPro',
  meta: [
    {
      name: 'description',
      content: 'Blog de PortesPro con guías, consejos e información sobre mudanzas, portes y servicios de transporte en la Costa del Sol. Descubre las mejores empresas de mudanzas y cómo contratar servicios profesionales.'
    },
    {
      name: 'keywords',
      content: 'blog mudanzas, guías mudanzas, consejos mudanzas, empresas de mudanzas, mudanzas baratas, mudanzas económicas, servicio de mudanza, mudanzas costa del sol'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Blog de Mudanzas y Portes | PortesPro' },
    { property: 'og:description', content: 'Guías, consejos e información sobre mudanzas y portes en la Costa del Sol' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'PortesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Blog de Mudanzas y Portes | PortesPro' },
    { name: 'twitter:description', content: 'Guías y consejos sobre mudanzas en la Costa del Sol' },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

