import React from 'react'
import './AboutUs.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const AboutUs = () => {
  return (
    <div>
      <Header />

      <div className="about_us-whole-container">
        <div className="about_us-container">
          <p className='title'>✨ Welcome to Mystery Box, where every gift is a magical surprise for your child! ✨</p>
          <div className="content">
            <p className='sub-title'>📖 Our Story</p>
            <p className='sub-content'>Mystery Box is a unique e-commerce platform dedicated to bringing joy and excitement to children through themed gift packages. Founded with a passion for creating unforgettable moments, we aim to delight both children and parents with our carefully curated gift boxes.</p>
            <p className='sub-title'>🌟 Our Vision and Mission</p>
            <p className='sub-content'>Our vision is to be the leading provider of personalized and themed gift boxes that bring happiness and wonder to children everywhere. Our mission is to deliver joy and surprise through high-quality, tailored gift experiences that cater to each child's unique interests and preferences.</p>
            <p className='sub-title'>💖 Our Values</p>
            <li>Quality and Creativity: We prioritize high-quality products and innovative themes to spark imagination and joy.</li>
            <li>Customer Satisfaction: We are committed to exceeding customer expectations through exceptional service and attention to detail.</li>
            <li>Personalization: Every box is thoughtfully customized to match each child's interests and preferences.</li>
            <li>Sustainability: We strive to make eco-friendly choices in our packaging and product selections.</li>
            <p className='sub-title'>🎁 What We Offer</p>
            <p className='sub-content'>Mystery Box offers a variety of enchanting themes, each filled with numerous delightful products. From clothes and plastic toys to wooden games and backpacks, our boxes are packed with excitement and wonder. Parents can create a profile for their child, specifying their birth year, gender, and preferred themes, and choose from various packages that include different numbers of gift deliveries and average gift values.</p>
            <p className='sub-title'>🛠️ Our Process</p>
            <p className='sub-content'>Our team of dedicated staff members carefully selects products for each gift box, ensuring they align with your child's interests and past gift history. Our system evaluates the suitability of new gift boxes based on previous gifts, ensuring an 80% match or higher before a box is chosen for delivery. This guarantees that each gift is just right for your child!</p>
            <p className='sub-title'>🤖 Automatic Suggestions</p>
            <p className='sub-content'>Mystery Box can automatically suggest the perfect gift boxes for the number of deliveries included in your chosen package, making it easier for you to surprise your little one.</p>
            <p className='sub-title'>📝 Detailed Gift Information</p>
            <p className='sub-content'>Each gift box comes with detailed information about the products and quantities inside. The exterior of the box features a QR Code, allowing parents and children to scan and view the box's contents online, adding to the excitement!</p>
            <p className='sub-title'>☎️ Contact Us</p>
            <p className='sub-content'>We value your feedback and are here to assist you with any questions or concerns. Please reach out to us through our contact page for support.</p>
            <p className='join-us'>🎉 Join us at Mystery Box and make every moment special for your child. Let the magic of mystery unfold with every box! 🎉</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AboutUs