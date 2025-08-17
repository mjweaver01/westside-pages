<template>
  <footer class="site-footer">
    <div class="max-width">
      <div class="footer-content">
        <div class="footer-section">
          <img src="/nitro-logo.png" alt="Westside Barbell" class="footer-logo" />
          <p>The world's strongest training facility</p>
        </div>

        <div class="footer-section">
          <h6>Quick Links</h6>
          <ul>
            <li v-for="link in links" :key="link.text">
              <a :href="link.url">{{ link.text }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h6>Contact</h6>
          <p>Columbus, Ohio</p>
          <p>info@westsidebarbell.com</p>
        </div>
      </div>

      <div class="footer-bottom-inner">
        <div class="footer-copyright">
          <p>&copy; {{ new Date().getFullYear() }} Westside Barbell. All rights reserved.</p>
          <a href="/pages/privacy-policy">Privacy Policy</a>
          &nbsp;
          <a href="/pages/terms-of-service">Terms Of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { links } from '@/utils/links'
</script>

<style lang="scss">
  @use '../scss/variables.scss' as *;

  // Footer styles
  .site-footer {
    background: $secondary-color;
    color: $white;
    padding: 3rem 0 1rem;
    margin-top: auto;
  }

  // Hide footer in iframe mode
  html.iframe-mode .site-footer {
    display: none !important;
  }

  .footer-logo {
    max-width: 8em;
    height: auto;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .footer-section {
    h3,
    h4 {
      color: $white;
      margin-bottom: 1rem;
    }

    h6 {
      color: $light-blue;
    }

    ul {
      list-style: none;
      margin-left: 0;

      li {
        margin-bottom: 0.5rem;

        a {
          color: $light-gray;
          text-decoration: none;
          transition: color 0.25s;

          &:hover {
            color: $white;
          }
        }
      }
    }

    p {
      color: $light-gray;
      margin-bottom: 0.5rem;
    }
  }

  .footer-bottom {
    border-top: 1px solid $dark-gray;
    padding-top: 1rem;
    text-align: center;

    p {
      color: $light-gray;
      margin: 0;
    }
  }
</style>
