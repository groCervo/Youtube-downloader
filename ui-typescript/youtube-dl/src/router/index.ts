import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import ChannelDashboard from '@/layouts/ChannelDashboard.vue'
import ChannelVideos from '@/views/ChannelVideos.vue'
import ChannelPlaylists from '@/views/ChannelPlaylists.vue'
import About from '@/views/About.vue'
import ApiKeyManager from '@/views/ApiKeyManager.vue'
import { ApiKeyService } from "@/services/apiKeyService"
import { ApplicationContainer } from "@/di/index"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/api-key',
    name: 'api-manager',
    component: ApiKeyManager
  },
  {
    path: '/channel/:id',
    component: ChannelDashboard,
    children: [
      {
        path: '',
        redirect: { name: 'channel-uploaded-videos' }
      },
      {
        path: 'playlist/:mainplaylistId/videos',
        name: 'channel-uploaded-videos',
        component: ChannelVideos
      },
      {
        path: 'playlists',
        name: 'channel-playlists',
        component: ChannelPlaylists
      },
      {
        path: 'playlist/:playlistId/videos',
        name: 'playlist-videos',
        component: ChannelVideos
      },
      {
        path: 'help',
        name: 'help',
        component: About
      }
    ]

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Check if API_Key is set, if not redirect to set api key page
router.beforeEach((to, from, next) => {
  const apiKeyService = ApplicationContainer.resolve(ApiKeyService)
  if (to.name !== 'api-manager' && !apiKeyService.getApiKey()) next({ name: 'api-manager' })
  else next()
})

export default router
