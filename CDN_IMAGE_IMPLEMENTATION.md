# CDN Image Implementation Guide

This guide explains how to implement CDN images from Vedantu.com to enhance the UpSkill platform's visual appeal and authenticity.

## Overview

To make the UpSkill platform more visually appealing and authentic (similar to Vedantu.com), we need to replace local images with CDN-hosted images from Vedantu's platform.

## Implementation Steps

### 1. Identify CDN Image Sources

Vedantu's CDN images are typically hosted on domains like:
- `https://d1gfiez264df59.cloudfront.net/`
- `https://d2h82hecmv8cep.cloudfront.net/`
- `https://d3an3z9b5zb3ve.cloudfront.net/`

### 2. Replace Hero Section Images

In `/components/homes/home-1/Hero.jsx`, replace:
```jsx
<Image
  className="lazyload"
  data-src="/images/page-title/page-title-home1.png"
  alt="Online Learning Platform - Students attending live interactive classes with expert instructors"
  width={960}
  height={1161}
  src="/images/page-title/page-title-home1.png"
/>
```

With a CDN image URL:
```jsx
<Image
  className="lazyload"
  data-src="https://d1gfiez264df59.cloudfront.net/path-to-hero-image.jpg"
  alt="Online Learning Platform - Students attending live interactive classes with expert instructors"
  width={960}
  height={1161}
  src="https://d1gfiez264df59.cloudfront.net/path-to-hero-image.jpg"
/>
```

### 3. Replace Facts Section Images

In `/components/homes/home-1/Facts.jsx`, replace:
```jsx
<Image
  className="lazyload"
  data-src="/images/section/key-1.jpg"
  alt="Students learning online with UpSkill - Interactive education platform"
  src="/images/section/key-1.jpg"
  width={1370}
  height={1301}
/>
```

With a CDN image URL:
```jsx
<Image
  className="lazyload"
  data-src="https://d2h82hecmv8cep.cloudfront.net/path-to-facts-image.jpg"
  alt="Students learning online with UpSkill - Interactive education platform"
  src="https://d2h82hecmv8cep.cloudfront.net/path-to-facts-image.jpg"
  width={1370}
  height={1301}
/>
```

### 4. Replace Instructor Images

In `/components/homes/home-1/Instractors.jsx`, replace:
```jsx
<Image
  className="lazyload"
  data-src={instructor.imgSrc}
  alt={`${instructor.name} - ${instructor.description} - Professional Online Instructor`}
  src={instructor.imgSrc}
  width={520}
  height={521}
/>
```

With CDN image URLs in the data files.

### 5. Replace Course Images

In `/components/common/Courses.jsx`, replace:
```jsx
<Image
  className="lazyload"
  data-src={course.imgSrc}
  alt={`${course.alt} - Online Course`}
  src={course.imgSrc}
  width={520}
  height={380}
/>
```

With CDN image URLs in the data files.

### 6. Replace Testimonial Avatar Images

In `/components/homes/home-1/Testimonials.jsx`, replace:
```jsx
<Image
  className="lazyload testimonials-thumb-image"
  src={avatar.src}
  alt={`${avatar.alt} - UpSkill Student Success Story`}
  width={avatar.width}
  height={avatar.height}
/>
```

With CDN image URLs in the data files.

## Image Types to Source from Vedantu CDN

1. **Hero Images**: High-quality images showing students in live online classes
2. **Course Category Images**: Subject-specific imagery for different learning categories
3. **Instructor Photos**: Professional headshots of educators
4. **Student Success Images**: Photos showing student achievements and learning moments
5. **Course Cover Images**: Visual representations of different course topics
6. **Testimonial Avatars**: Student profile pictures for testimonials

## Best Practices

1. **Image Optimization**: Ensure all CDN images are properly optimized for web use
2. **Responsive Design**: Use appropriately sized images for different screen sizes
3. **Alt Text**: Maintain descriptive alt text for accessibility
4. **Lazy Loading**: Keep lazy loading implementation for performance
5. **Fallback Images**: Maintain local images as fallbacks in case CDN is unavailable

## Implementation Priority

1. Hero section images (highest impact)
2. Course images (directly related to content)
3. Instructor images (builds trust)
4. Testimonial avatars (social proof)
5. Facts section images (supporting content)

## Note on Licensing

Ensure all images used from Vedantu's CDN comply with licensing requirements or are appropriately licensed for use in your project.