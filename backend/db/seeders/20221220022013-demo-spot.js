'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Old Corner Shop",
        description:"Welcome to the Old Corner Shop, a beautiful house located in the heart of Malibu, California. This unique and charming property was once an old corner shop, but has been lovingly restored and renovated to offer all the modern amenities while still retaining its historic charm. As you step through the front door, you'll be greeted by a bright and airy living space with large windows that let in plenty of natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together. The Old Corner Shop has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Outside, you'll find a lovely private courtyard with a seating area, perfect for enjoying a morning coffee or evening cocktail. The courtyard is surrounded by lush greenery, providing a tranquil and peaceful oasis in the heart of Malibu. Located just a short walk from the beach, the Old Corner Shop is the perfect base for exploring all that Malibu has to offer. Whether you're looking to relax on the beach, go hiking in the hills, or sample some of the local cuisine, this beautiful house is the perfect home away from home. Book your stay today and experience the best of Malibu living at the Old Corner Shop.",   price: 500
      },
      {
        ownerId: "2",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The Ivies",
        description:"Welcome to our beautiful and stylish house, located in a serene and peaceful location, surrounded by nature's lush greenery. This charming and cozy home has everything you need for a comfortable and relaxing stay. As you step inside, you'll be greeted by a warm and welcoming living room, complete with comfortable seating, a fireplace, and large windows that let in plenty of natural light. The living room flows seamlessly into a spacious dining area, perfect for enjoying meals with family and friends. The kitchen is fully equipped with modern appliances and features plenty of counter space and storage, making it a pleasure to cook in. Whether you're preparing a simple breakfast or a full-course dinner, this kitchen has everything you need. The house has two beautifully decorated bedrooms, each with a comfortable queen-size bed, plush bedding, and plenty of storage space. The bedrooms are designed to create a peaceful and relaxing atmosphere, ensuring you get a good night's rest. Outside, you'll find a large deck with stunning views of the surrounding hills and forest. Enjoy your morning coffee or evening cocktails while taking in the peacefulness of your surroundings. The deck is also a great spot for al fresco dining or simply lounging in the sun. Located just a short drive from downtown, this house is the perfect retreat for those seeking a peaceful and relaxing escape from the hustle and bustle of the city. Book your stay today and experience the beauty and serenity of this stunning house.",  price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "Honolulu",
        state: "HI",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Zlatan's House",
        description:`
        Welcome to our stunning beachfront villa, located on the beautiful coast of Hawaii. This luxurious property is the perfect vacation home for those seeking a private and peaceful retreat with breathtaking ocean views. As you step through the front door, you'll be greeted by a spacious and airy living room with large windows that offer stunning panoramic views of the turquoise waters of the Pacific Ocean. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together while taking in the stunning ocean views. This beachfront villa has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Step outside onto the private balcony, and you'll find yourself surrounded by the soothing sounds of the ocean waves. The balcony offers plenty of seating, perfect for enjoying your morning coffee or evening cocktail while taking in the stunning sunset views over the ocean. Located just steps from the beach, this beachfront villa is the perfect base for exploring all that Hawaii has to offer. Whether you're looking to relax on the beach, go snorkeling in the crystal-clear waters, or simply soak up the sun, this beautiful villa is the perfect home away from home. Book your stay today and experience the ultimate luxury beachfront vacation at our stunning Hawaiian villa.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "Ashley Lodge",
        description:`Welcome to your dream vacation home, where you can experience the ultimate luxury retreat in the heart of nature. This stunning property is nestled in a tranquil setting surrounded by breathtaking scenery that is sure to take your breath away. As you approach the house, you'll be struck by its modern and sleek design, which seamlessly blends with the natural surroundings. The large windows and glass doors offer stunning views of the surrounding forest and allow plenty of natural light to flood the living space. Step inside and you'll be greeted by an open-plan living space that features a comfortable seating area, a dining area, and a fully equipped kitchen with state-of-the-art appliances. The decor is minimalist and contemporary, with a neutral color palette that creates a calming and serene atmosphere. The house has two spacious and beautifully appointed bedrooms, each with a comfortable king-size bed and an en-suite bathroom. The bedrooms are designed to offer maximum comfort and relaxation, with luxurious linens, plush pillows, and plenty of storage space. The highlight of this property is undoubtedly the outdoor space. Step outside onto the expansive wooden deck, and you'll find a large hot tub that is perfect for soaking in after a long day of exploring the area. The deck also features comfortable outdoor seating, a dining table, and a BBQ grill, making it the perfect space for entertaining or enjoying a meal with friends and family. This vacation home is situated in the heart of nature, surrounded by hiking and biking trails, and just a short drive from the beach. It's the perfect escape from the hustle and bustle of the city, and a wonderful opportunity to relax and recharge in a serene and picturesque setting. Book your stay today and experience the ultimate luxury retreat in the heart of nature.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Rose End",
        description:`
        Welcome to our stunning and serene desert oasis, a perfect getaway for those looking to escape the hustle and bustle of city life. This beautifully designed house is located in the heart of the Joshua Tree National Park area, surrounded by breathtaking natural beauty and unique desert landscape. As you step through the front door, you'll be greeted by a warm and inviting living space that seamlessly blends modern design with natural elements. The open-plan layout creates a spacious and airy feel, with large windows that offer stunning views of the desert landscape. The living area features a comfortable sofa and chairs, perfect for relaxing and taking in the stunning surroundings. The fully equipped kitchen is ideal for preparing meals, with modern appliances and plenty of counter space. The house has two spacious bedrooms, each with a comfortable queen-sized bed and large windows that offer stunning views of the surrounding desert. The bedrooms are tastefully decorated with natural materials and soft, neutral tones, creating a peaceful and calming atmosphere. Outside, you'll find a beautiful patio area with comfortable seating and a fire pit, perfect for enjoying the peaceful desert evenings. The patio is surrounded by unique desert landscape and offers uninterrupted views of the starry night sky. Located just a short drive from the entrance to the Joshua Tree National Park, this house is the perfect base for exploring all that this unique and stunning area has to offer. Whether you're looking to hike, rock climb, or simply relax and enjoy the natural beauty of the desert, our house provides the perfect retreat. Book your stay today and experience the magic of the desert for yourself.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Sea View",
        description:`Welcome to our beautiful and modern beachfront villa, located in the heart of Santa Barbara, California. This stunning property is the perfect retreat for those looking for a luxurious getaway with breathtaking views of the ocean. As you step inside, you'll be greeted by an open-plan living area with floor-to-ceiling windows that offer panoramic views of the ocean. The living area is tastefully decorated with stylish and comfortable furniture, perfect for lounging and enjoying the stunning views. The modern and fully-equipped kitchen features high-end stainless steel appliances and everything you need to prepare delicious meals for your family or friends. The dining area has a large wooden table with seating for up to six people, perfect for enjoying meals together while taking in the beautiful ocean views. This villa has two bedrooms, each with a comfortable king-size bed, high-quality linens, and their own private bathroom. Both bedrooms have large windows that offer stunning views of the ocean, allowing you to wake up to the sound of the waves and the warm California sun. Outside, you'll find a spacious deck with comfortable outdoor furniture, perfect for enjoying a glass of wine while watching the sunset over the ocean. The deck also features a hot tub, providing the ultimate relaxation experience as you soak in the warm bubbles while gazing out at the beautiful ocean. Located just steps away from the beach, this villa is the perfect base for exploring Santa Barbara and all it has to offer. Whether you're looking to relax on the beach, go shopping in the nearby boutiques, or sample some of the local cuisine, this beautiful beachfront villa is the perfect home away from home. Book your stay today and experience the ultimate California beach getaway!`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "South House",
        description:`
        Welcome to our stunning beachfront villa, located just steps away from the beautiful white sand and turquoise waters of the Caribbean Sea. This luxurious vacation home boasts incredible views and offers the ultimate in tropical living. As you step inside, you'll be greeted by a spacious and open living area with comfortable seating, perfect for relaxing and taking in the breathtaking ocean views. Large windows and sliding glass doors allow plenty of natural light to flood the space, creating a bright and welcoming atmosphere. The modern kitchen is fully equipped with state-of-the-art appliances and features a large island with bar seating, making it easy to prepare meals and entertain guests at the same time. The adjacent dining area offers seating for up to eight people, and is the perfect spot for enjoying a delicious meal with family and friends. This stunning villa boasts five bedrooms, each with its own private en-suite bathroom, making it perfect for larger families or groups of friends. The bedrooms are beautifully decorated in a contemporary style, with luxurious linens and plenty of storage space. Outside, you'll find a large terrace with a covered dining area and plenty of seating, perfect for enjoying al fresco meals while taking in the breathtaking ocean views. The infinity pool provides a refreshing escape from the Caribbean sun, and the surrounding sun loungers offer the perfect spot for soaking up some rays. Located just a short drive from local shops and restaurants, our beachfront villa offers the perfect combination of luxury and convenience. Whether you're looking to explore the local area, or simply relax and soak up the sun, this stunning vacation home is the perfect choice for your next tropical getaway. Book your stay today and experience the ultimate in Caribbean living.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Seaways",
        description:`Welcome to our stunning beachfront house, located on the picturesque coast of California. This beautiful property offers panoramic ocean views and direct access to the beach, making it the perfect destination for your next getaway. As you step inside, you'll be immediately drawn to the spacious living area with its high ceilings, large windows, and natural light that floods the space. The comfortable couches and chairs provide ample seating for everyone to relax and enjoy the breathtaking views of the Pacific Ocean. The open-plan kitchen is fully equipped with all the amenities you need to cook a delicious meal, including modern appliances, granite countertops, and plenty of cupboard space. The dining area features a beautiful wooden table that can seat up to six people, perfect for enjoying a meal while watching the sunset. The house boasts three beautifully appointed bedrooms, each with comfortable beds, high-quality linens, and ample storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The other two bedrooms share a bathroom with a shower and bathtub. Outside, you'll find a spacious deck area that offers stunning views of the ocean and is the perfect spot for relaxing or dining al fresco. The deck is equipped with comfortable outdoor furniture, including a dining table and chairs, loungers, and a BBQ. With direct access to the beach, you can spend your days swimming, surfing, or simply relaxing on the sandy shores. And if you want to explore the local area, there are plenty of attractions, including restaurants, cafes, and shops, all within easy reach. Book your stay at our beautiful beachfront house today and experience the ultimate California coastal getaway.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Roselands",
        description:`
        Welcome to our beautiful coastal home, located in the picturesque town of Cannon Beach, Oregon. This stunning property boasts a prime location just steps away from the sandy beach, offering breathtaking ocean views and easy access to all the seaside fun. As you step inside, you'll be greeted by a bright and airy living space with large windows that flood the room with natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The living area is beautifully furnished with comfortable seating and stylish decor, providing the perfect spot to relax and unwind after a day spent exploring the beach. The dining area features a large wooden table and seating for up to six people, making it ideal for enjoying a family meal together. The fully equipped kitchen boasts high-end appliances and everything you need to prepare a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. This gorgeous home features two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom boasts a king-size bed and breathtaking ocean views, while the second bedroom features a queen-size bed and a cozy, welcoming atmosphere. Outside, you'll find a spacious deck with comfortable seating, perfect for enjoying the fresh ocean breeze and stunning views of the Pacific. The deck is also equipped with a grill, making it easy to cook up a delicious meal while taking in the beauty of the Oregon coast. Book your stay at this beautiful Cannon Beach home today and experience the best of coastal living in Oregon.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Old Corner Shop",
        description:"Welcome to the Old Corner Shop, a beautiful house located in the heart of Malibu, California. This unique and charming property was once an old corner shop, but has been lovingly restored and renovated to offer all the modern amenities while still retaining its historic charm. As you step through the front door, you'll be greeted by a bright and airy living space with large windows that let in plenty of natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together. The Old Corner Shop has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Outside, you'll find a lovely private courtyard with a seating area, perfect for enjoying a morning coffee or evening cocktail. The courtyard is surrounded by lush greenery, providing a tranquil and peaceful oasis in the heart of Malibu. Located just a short walk from the beach, the Old Corner Shop is the perfect base for exploring all that Malibu has to offer. Whether you're looking to relax on the beach, go hiking in the hills, or sample some of the local cuisine, this beautiful house is the perfect home away from home. Book your stay today and experience the best of Malibu living at the Old Corner Shop.",   price: 500
      },
      {
        ownerId: "2",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The Ivies",
        description:"Welcome to our beautiful and stylish house, located in a serene and peaceful location, surrounded by nature's lush greenery. This charming and cozy home has everything you need for a comfortable and relaxing stay. As you step inside, you'll be greeted by a warm and welcoming living room, complete with comfortable seating, a fireplace, and large windows that let in plenty of natural light. The living room flows seamlessly into a spacious dining area, perfect for enjoying meals with family and friends. The kitchen is fully equipped with modern appliances and features plenty of counter space and storage, making it a pleasure to cook in. Whether you're preparing a simple breakfast or a full-course dinner, this kitchen has everything you need. The house has two beautifully decorated bedrooms, each with a comfortable queen-size bed, plush bedding, and plenty of storage space. The bedrooms are designed to create a peaceful and relaxing atmosphere, ensuring you get a good night's rest. Outside, you'll find a large deck with stunning views of the surrounding hills and forest. Enjoy your morning coffee or evening cocktails while taking in the peacefulness of your surroundings. The deck is also a great spot for al fresco dining or simply lounging in the sun. Located just a short drive from downtown, this house is the perfect retreat for those seeking a peaceful and relaxing escape from the hustle and bustle of the city. Book your stay today and experience the beauty and serenity of this stunning house.",  price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "Honolulu",
        state: "HI",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Zlatan's House",
        description:`
        Welcome to our stunning beachfront villa, located on the beautiful coast of Hawaii. This luxurious property is the perfect vacation home for those seeking a private and peaceful retreat with breathtaking ocean views. As you step through the front door, you'll be greeted by a spacious and airy living room with large windows that offer stunning panoramic views of the turquoise waters of the Pacific Ocean. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together while taking in the stunning ocean views. This beachfront villa has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Step outside onto the private balcony, and you'll find yourself surrounded by the soothing sounds of the ocean waves. The balcony offers plenty of seating, perfect for enjoying your morning coffee or evening cocktail while taking in the stunning sunset views over the ocean. Located just steps from the beach, this beachfront villa is the perfect base for exploring all that Hawaii has to offer. Whether you're looking to relax on the beach, go snorkeling in the crystal-clear waters, or simply soak up the sun, this beautiful villa is the perfect home away from home. Book your stay today and experience the ultimate luxury beachfront vacation at our stunning Hawaiian villa.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "Ashley Lodge",
        description:`Welcome to your dream vacation home, where you can experience the ultimate luxury retreat in the heart of nature. This stunning property is nestled in a tranquil setting surrounded by breathtaking scenery that is sure to take your breath away. As you approach the house, you'll be struck by its modern and sleek design, which seamlessly blends with the natural surroundings. The large windows and glass doors offer stunning views of the surrounding forest and allow plenty of natural light to flood the living space. Step inside and you'll be greeted by an open-plan living space that features a comfortable seating area, a dining area, and a fully equipped kitchen with state-of-the-art appliances. The decor is minimalist and contemporary, with a neutral color palette that creates a calming and serene atmosphere. The house has two spacious and beautifully appointed bedrooms, each with a comfortable king-size bed and an en-suite bathroom. The bedrooms are designed to offer maximum comfort and relaxation, with luxurious linens, plush pillows, and plenty of storage space. The highlight of this property is undoubtedly the outdoor space. Step outside onto the expansive wooden deck, and you'll find a large hot tub that is perfect for soaking in after a long day of exploring the area. The deck also features comfortable outdoor seating, a dining table, and a BBQ grill, making it the perfect space for entertaining or enjoying a meal with friends and family. This vacation home is situated in the heart of nature, surrounded by hiking and biking trails, and just a short drive from the beach. It's the perfect escape from the hustle and bustle of the city, and a wonderful opportunity to relax and recharge in a serene and picturesque setting. Book your stay today and experience the ultimate luxury retreat in the heart of nature.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Rose End",
        description:`
        Welcome to our stunning and serene desert oasis, a perfect getaway for those looking to escape the hustle and bustle of city life. This beautifully designed house is located in the heart of the Joshua Tree National Park area, surrounded by breathtaking natural beauty and unique desert landscape. As you step through the front door, you'll be greeted by a warm and inviting living space that seamlessly blends modern design with natural elements. The open-plan layout creates a spacious and airy feel, with large windows that offer stunning views of the desert landscape. The living area features a comfortable sofa and chairs, perfect for relaxing and taking in the stunning surroundings. The fully equipped kitchen is ideal for preparing meals, with modern appliances and plenty of counter space. The house has two spacious bedrooms, each with a comfortable queen-sized bed and large windows that offer stunning views of the surrounding desert. The bedrooms are tastefully decorated with natural materials and soft, neutral tones, creating a peaceful and calming atmosphere. Outside, you'll find a beautiful patio area with comfortable seating and a fire pit, perfect for enjoying the peaceful desert evenings. The patio is surrounded by unique desert landscape and offers uninterrupted views of the starry night sky. Located just a short drive from the entrance to the Joshua Tree National Park, this house is the perfect base for exploring all that this unique and stunning area has to offer. Whether you're looking to hike, rock climb, or simply relax and enjoy the natural beauty of the desert, our house provides the perfect retreat. Book your stay today and experience the magic of the desert for yourself.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Sea View",
        description:`Welcome to our beautiful and modern beachfront villa, located in the heart of Santa Barbara, California. This stunning property is the perfect retreat for those looking for a luxurious getaway with breathtaking views of the ocean. As you step inside, you'll be greeted by an open-plan living area with floor-to-ceiling windows that offer panoramic views of the ocean. The living area is tastefully decorated with stylish and comfortable furniture, perfect for lounging and enjoying the stunning views. The modern and fully-equipped kitchen features high-end stainless steel appliances and everything you need to prepare delicious meals for your family or friends. The dining area has a large wooden table with seating for up to six people, perfect for enjoying meals together while taking in the beautiful ocean views. This villa has two bedrooms, each with a comfortable king-size bed, high-quality linens, and their own private bathroom. Both bedrooms have large windows that offer stunning views of the ocean, allowing you to wake up to the sound of the waves and the warm California sun. Outside, you'll find a spacious deck with comfortable outdoor furniture, perfect for enjoying a glass of wine while watching the sunset over the ocean. The deck also features a hot tub, providing the ultimate relaxation experience as you soak in the warm bubbles while gazing out at the beautiful ocean. Located just steps away from the beach, this villa is the perfect base for exploring Santa Barbara and all it has to offer. Whether you're looking to relax on the beach, go shopping in the nearby boutiques, or sample some of the local cuisine, this beautiful beachfront villa is the perfect home away from home. Book your stay today and experience the ultimate California beach getaway!`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "South House",
        description:`
        Welcome to our stunning beachfront villa, located just steps away from the beautiful white sand and turquoise waters of the Caribbean Sea. This luxurious vacation home boasts incredible views and offers the ultimate in tropical living. As you step inside, you'll be greeted by a spacious and open living area with comfortable seating, perfect for relaxing and taking in the breathtaking ocean views. Large windows and sliding glass doors allow plenty of natural light to flood the space, creating a bright and welcoming atmosphere. The modern kitchen is fully equipped with state-of-the-art appliances and features a large island with bar seating, making it easy to prepare meals and entertain guests at the same time. The adjacent dining area offers seating for up to eight people, and is the perfect spot for enjoying a delicious meal with family and friends. This stunning villa boasts five bedrooms, each with its own private en-suite bathroom, making it perfect for larger families or groups of friends. The bedrooms are beautifully decorated in a contemporary style, with luxurious linens and plenty of storage space. Outside, you'll find a large terrace with a covered dining area and plenty of seating, perfect for enjoying al fresco meals while taking in the breathtaking ocean views. The infinity pool provides a refreshing escape from the Caribbean sun, and the surrounding sun loungers offer the perfect spot for soaking up some rays. Located just a short drive from local shops and restaurants, our beachfront villa offers the perfect combination of luxury and convenience. Whether you're looking to explore the local area, or simply relax and soak up the sun, this stunning vacation home is the perfect choice for your next tropical getaway. Book your stay today and experience the ultimate in Caribbean living.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Seaways",
        description:`Welcome to our stunning beachfront house, located on the picturesque coast of California. This beautiful property offers panoramic ocean views and direct access to the beach, making it the perfect destination for your next getaway. As you step inside, you'll be immediately drawn to the spacious living area with its high ceilings, large windows, and natural light that floods the space. The comfortable couches and chairs provide ample seating for everyone to relax and enjoy the breathtaking views of the Pacific Ocean. The open-plan kitchen is fully equipped with all the amenities you need to cook a delicious meal, including modern appliances, granite countertops, and plenty of cupboard space. The dining area features a beautiful wooden table that can seat up to six people, perfect for enjoying a meal while watching the sunset. The house boasts three beautifully appointed bedrooms, each with comfortable beds, high-quality linens, and ample storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The other two bedrooms share a bathroom with a shower and bathtub. Outside, you'll find a spacious deck area that offers stunning views of the ocean and is the perfect spot for relaxing or dining al fresco. The deck is equipped with comfortable outdoor furniture, including a dining table and chairs, loungers, and a BBQ. With direct access to the beach, you can spend your days swimming, surfing, or simply relaxing on the sandy shores. And if you want to explore the local area, there are plenty of attractions, including restaurants, cafes, and shops, all within easy reach. Book your stay at our beautiful beachfront house today and experience the ultimate California coastal getaway.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Roselands",
        description:`
        Welcome to our beautiful coastal home, located in the picturesque town of Cannon Beach, Oregon. This stunning property boasts a prime location just steps away from the sandy beach, offering breathtaking ocean views and easy access to all the seaside fun. As you step inside, you'll be greeted by a bright and airy living space with large windows that flood the room with natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The living area is beautifully furnished with comfortable seating and stylish decor, providing the perfect spot to relax and unwind after a day spent exploring the beach. The dining area features a large wooden table and seating for up to six people, making it ideal for enjoying a family meal together. The fully equipped kitchen boasts high-end appliances and everything you need to prepare a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. This gorgeous home features two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom boasts a king-size bed and breathtaking ocean views, while the second bedroom features a queen-size bed and a cozy, welcoming atmosphere. Outside, you'll find a spacious deck with comfortable seating, perfect for enjoying the fresh ocean breeze and stunning views of the Pacific. The deck is also equipped with a grill, making it easy to cook up a delicious meal while taking in the beauty of the Oregon coast. Book your stay at this beautiful Cannon Beach home today and experience the best of coastal living in Oregon.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Old Corner Shop",
        description:"Welcome to the Old Corner Shop, a beautiful house located in the heart of Malibu, California. This unique and charming property was once an old corner shop, but has been lovingly restored and renovated to offer all the modern amenities while still retaining its historic charm. As you step through the front door, you'll be greeted by a bright and airy living space with large windows that let in plenty of natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together. The Old Corner Shop has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Outside, you'll find a lovely private courtyard with a seating area, perfect for enjoying a morning coffee or evening cocktail. The courtyard is surrounded by lush greenery, providing a tranquil and peaceful oasis in the heart of Malibu. Located just a short walk from the beach, the Old Corner Shop is the perfect base for exploring all that Malibu has to offer. Whether you're looking to relax on the beach, go hiking in the hills, or sample some of the local cuisine, this beautiful house is the perfect home away from home. Book your stay today and experience the best of Malibu living at the Old Corner Shop.",   price: 500
      },
      {
        ownerId: "2",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The Ivies",
        description:"Welcome to our beautiful and stylish house, located in a serene and peaceful location, surrounded by nature's lush greenery. This charming and cozy home has everything you need for a comfortable and relaxing stay. As you step inside, you'll be greeted by a warm and welcoming living room, complete with comfortable seating, a fireplace, and large windows that let in plenty of natural light. The living room flows seamlessly into a spacious dining area, perfect for enjoying meals with family and friends. The kitchen is fully equipped with modern appliances and features plenty of counter space and storage, making it a pleasure to cook in. Whether you're preparing a simple breakfast or a full-course dinner, this kitchen has everything you need. The house has two beautifully decorated bedrooms, each with a comfortable queen-size bed, plush bedding, and plenty of storage space. The bedrooms are designed to create a peaceful and relaxing atmosphere, ensuring you get a good night's rest. Outside, you'll find a large deck with stunning views of the surrounding hills and forest. Enjoy your morning coffee or evening cocktails while taking in the peacefulness of your surroundings. The deck is also a great spot for al fresco dining or simply lounging in the sun. Located just a short drive from downtown, this house is the perfect retreat for those seeking a peaceful and relaxing escape from the hustle and bustle of the city. Book your stay today and experience the beauty and serenity of this stunning house.",  price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "Honolulu",
        state: "HI",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Zlatan's House",
        description:`
        Welcome to our stunning beachfront villa, located on the beautiful coast of Hawaii. This luxurious property is the perfect vacation home for those seeking a private and peaceful retreat with breathtaking ocean views. As you step through the front door, you'll be greeted by a spacious and airy living room with large windows that offer stunning panoramic views of the turquoise waters of the Pacific Ocean. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining or spending quality time with family and friends. The kitchen is fully equipped with high-end appliances and everything you need to cook up a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. The dining area features a beautiful wooden table and seating for up to six people, perfect for enjoying a meal together while taking in the stunning ocean views. This beachfront villa has two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The second bedroom has a queen-size bed and access to a separate bathroom with a shower and bathtub. Step outside onto the private balcony, and you'll find yourself surrounded by the soothing sounds of the ocean waves. The balcony offers plenty of seating, perfect for enjoying your morning coffee or evening cocktail while taking in the stunning sunset views over the ocean. Located just steps from the beach, this beachfront villa is the perfect base for exploring all that Hawaii has to offer. Whether you're looking to relax on the beach, go snorkeling in the crystal-clear waters, or simply soak up the sun, this beautiful villa is the perfect home away from home. Book your stay today and experience the ultimate luxury beachfront vacation at our stunning Hawaiian villa.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "Ashley Lodge",
        description:`Welcome to your dream vacation home, where you can experience the ultimate luxury retreat in the heart of nature. This stunning property is nestled in a tranquil setting surrounded by breathtaking scenery that is sure to take your breath away. As you approach the house, you'll be struck by its modern and sleek design, which seamlessly blends with the natural surroundings. The large windows and glass doors offer stunning views of the surrounding forest and allow plenty of natural light to flood the living space. Step inside and you'll be greeted by an open-plan living space that features a comfortable seating area, a dining area, and a fully equipped kitchen with state-of-the-art appliances. The decor is minimalist and contemporary, with a neutral color palette that creates a calming and serene atmosphere. The house has two spacious and beautifully appointed bedrooms, each with a comfortable king-size bed and an en-suite bathroom. The bedrooms are designed to offer maximum comfort and relaxation, with luxurious linens, plush pillows, and plenty of storage space. The highlight of this property is undoubtedly the outdoor space. Step outside onto the expansive wooden deck, and you'll find a large hot tub that is perfect for soaking in after a long day of exploring the area. The deck also features comfortable outdoor seating, a dining table, and a BBQ grill, making it the perfect space for entertaining or enjoying a meal with friends and family. This vacation home is situated in the heart of nature, surrounded by hiking and biking trails, and just a short drive from the beach. It's the perfect escape from the hustle and bustle of the city, and a wonderful opportunity to relax and recharge in a serene and picturesque setting. Book your stay today and experience the ultimate luxury retreat in the heart of nature.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Rose End",
        description:`
        Welcome to our stunning and serene desert oasis, a perfect getaway for those looking to escape the hustle and bustle of city life. This beautifully designed house is located in the heart of the Joshua Tree National Park area, surrounded by breathtaking natural beauty and unique desert landscape. As you step through the front door, you'll be greeted by a warm and inviting living space that seamlessly blends modern design with natural elements. The open-plan layout creates a spacious and airy feel, with large windows that offer stunning views of the desert landscape. The living area features a comfortable sofa and chairs, perfect for relaxing and taking in the stunning surroundings. The fully equipped kitchen is ideal for preparing meals, with modern appliances and plenty of counter space. The house has two spacious bedrooms, each with a comfortable queen-sized bed and large windows that offer stunning views of the surrounding desert. The bedrooms are tastefully decorated with natural materials and soft, neutral tones, creating a peaceful and calming atmosphere. Outside, you'll find a beautiful patio area with comfortable seating and a fire pit, perfect for enjoying the peaceful desert evenings. The patio is surrounded by unique desert landscape and offers uninterrupted views of the starry night sky. Located just a short drive from the entrance to the Joshua Tree National Park, this house is the perfect base for exploring all that this unique and stunning area has to offer. Whether you're looking to hike, rock climb, or simply relax and enjoy the natural beauty of the desert, our house provides the perfect retreat. Book your stay today and experience the magic of the desert for yourself.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Sea View",
        description:`Welcome to our beautiful and modern beachfront villa, located in the heart of Santa Barbara, California. This stunning property is the perfect retreat for those looking for a luxurious getaway with breathtaking views of the ocean. As you step inside, you'll be greeted by an open-plan living area with floor-to-ceiling windows that offer panoramic views of the ocean. The living area is tastefully decorated with stylish and comfortable furniture, perfect for lounging and enjoying the stunning views. The modern and fully-equipped kitchen features high-end stainless steel appliances and everything you need to prepare delicious meals for your family or friends. The dining area has a large wooden table with seating for up to six people, perfect for enjoying meals together while taking in the beautiful ocean views. This villa has two bedrooms, each with a comfortable king-size bed, high-quality linens, and their own private bathroom. Both bedrooms have large windows that offer stunning views of the ocean, allowing you to wake up to the sound of the waves and the warm California sun. Outside, you'll find a spacious deck with comfortable outdoor furniture, perfect for enjoying a glass of wine while watching the sunset over the ocean. The deck also features a hot tub, providing the ultimate relaxation experience as you soak in the warm bubbles while gazing out at the beautiful ocean. Located just steps away from the beach, this villa is the perfect base for exploring Santa Barbara and all it has to offer. Whether you're looking to relax on the beach, go shopping in the nearby boutiques, or sample some of the local cuisine, this beautiful beachfront villa is the perfect home away from home. Book your stay today and experience the ultimate California beach getaway!`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "South House",
        description:`
        Welcome to our stunning beachfront villa, located just steps away from the beautiful white sand and turquoise waters of the Caribbean Sea. This luxurious vacation home boasts incredible views and offers the ultimate in tropical living. As you step inside, you'll be greeted by a spacious and open living area with comfortable seating, perfect for relaxing and taking in the breathtaking ocean views. Large windows and sliding glass doors allow plenty of natural light to flood the space, creating a bright and welcoming atmosphere. The modern kitchen is fully equipped with state-of-the-art appliances and features a large island with bar seating, making it easy to prepare meals and entertain guests at the same time. The adjacent dining area offers seating for up to eight people, and is the perfect spot for enjoying a delicious meal with family and friends. This stunning villa boasts five bedrooms, each with its own private en-suite bathroom, making it perfect for larger families or groups of friends. The bedrooms are beautifully decorated in a contemporary style, with luxurious linens and plenty of storage space. Outside, you'll find a large terrace with a covered dining area and plenty of seating, perfect for enjoying al fresco meals while taking in the breathtaking ocean views. The infinity pool provides a refreshing escape from the Caribbean sun, and the surrounding sun loungers offer the perfect spot for soaking up some rays. Located just a short drive from local shops and restaurants, our beachfront villa offers the perfect combination of luxury and convenience. Whether you're looking to explore the local area, or simply relax and soak up the sun, this stunning vacation home is the perfect choice for your next tropical getaway. Book your stay today and experience the ultimate in Caribbean living.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Seaways",
        description:`Welcome to our stunning beachfront house, located on the picturesque coast of California. This beautiful property offers panoramic ocean views and direct access to the beach, making it the perfect destination for your next getaway. As you step inside, you'll be immediately drawn to the spacious living area with its high ceilings, large windows, and natural light that floods the space. The comfortable couches and chairs provide ample seating for everyone to relax and enjoy the breathtaking views of the Pacific Ocean. The open-plan kitchen is fully equipped with all the amenities you need to cook a delicious meal, including modern appliances, granite countertops, and plenty of cupboard space. The dining area features a beautiful wooden table that can seat up to six people, perfect for enjoying a meal while watching the sunset. The house boasts three beautifully appointed bedrooms, each with comfortable beds, high-quality linens, and ample storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The other two bedrooms share a bathroom with a shower and bathtub. Outside, you'll find a spacious deck area that offers stunning views of the ocean and is the perfect spot for relaxing or dining al fresco. The deck is equipped with comfortable outdoor furniture, including a dining table and chairs, loungers, and a BBQ. With direct access to the beach, you can spend your days swimming, surfing, or simply relaxing on the sandy shores. And if you want to explore the local area, there are plenty of attractions, including restaurants, cafes, and shops, all within easy reach. Book your stay at our beautiful beachfront house today and experience the ultimate California coastal getaway.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Roselands",
        description:`
        Welcome to our beautiful coastal home, located in the picturesque town of Cannon Beach, Oregon. This stunning property boasts a prime location just steps away from the sandy beach, offering breathtaking ocean views and easy access to all the seaside fun. As you step inside, you'll be greeted by a bright and airy living space with large windows that flood the room with natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The living area is beautifully furnished with comfortable seating and stylish decor, providing the perfect spot to relax and unwind after a day spent exploring the beach. The dining area features a large wooden table and seating for up to six people, making it ideal for enjoying a family meal together. The fully equipped kitchen boasts high-end appliances and everything you need to prepare a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. This gorgeous home features two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom boasts a king-size bed and breathtaking ocean views, while the second bedroom features a queen-size bed and a cozy, welcoming atmosphere. Outside, you'll find a spacious deck with comfortable seating, perfect for enjoying the fresh ocean breeze and stunning views of the Pacific. The deck is also equipped with a grill, making it easy to cook up a delicious meal while taking in the beauty of the Oregon coast. Book your stay at this beautiful Cannon Beach home today and experience the best of coastal living in Oregon.`,
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "South House",
        description:`
        Welcome to our stunning beachfront villa, located just steps away from the beautiful white sand and turquoise waters of the Caribbean Sea. This luxurious vacation home boasts incredible views and offers the ultimate in tropical living. As you step inside, you'll be greeted by a spacious and open living area with comfortable seating, perfect for relaxing and taking in the breathtaking ocean views. Large windows and sliding glass doors allow plenty of natural light to flood the space, creating a bright and welcoming atmosphere. The modern kitchen is fully equipped with state-of-the-art appliances and features a large island with bar seating, making it easy to prepare meals and entertain guests at the same time. The adjacent dining area offers seating for up to eight people, and is the perfect spot for enjoying a delicious meal with family and friends. This stunning villa boasts five bedrooms, each with its own private en-suite bathroom, making it perfect for larger families or groups of friends. The bedrooms are beautifully decorated in a contemporary style, with luxurious linens and plenty of storage space. Outside, you'll find a large terrace with a covered dining area and plenty of seating, perfect for enjoying al fresco meals while taking in the breathtaking ocean views. The infinity pool provides a refreshing escape from the Caribbean sun, and the surrounding sun loungers offer the perfect spot for soaking up some rays. Located just a short drive from local shops and restaurants, our beachfront villa offers the perfect combination of luxury and convenience. Whether you're looking to explore the local area, or simply relax and soak up the sun, this stunning vacation home is the perfect choice for your next tropical getaway. Book your stay today and experience the ultimate in Caribbean living.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Seaways",
        description:`Welcome to our stunning beachfront house, located on the picturesque coast of California. This beautiful property offers panoramic ocean views and direct access to the beach, making it the perfect destination for your next getaway. As you step inside, you'll be immediately drawn to the spacious living area with its high ceilings, large windows, and natural light that floods the space. The comfortable couches and chairs provide ample seating for everyone to relax and enjoy the breathtaking views of the Pacific Ocean. The open-plan kitchen is fully equipped with all the amenities you need to cook a delicious meal, including modern appliances, granite countertops, and plenty of cupboard space. The dining area features a beautiful wooden table that can seat up to six people, perfect for enjoying a meal while watching the sunset. The house boasts three beautifully appointed bedrooms, each with comfortable beds, high-quality linens, and ample storage space. The master bedroom features a king-size bed and an en-suite bathroom with a spacious shower and double vanity. The other two bedrooms share a bathroom with a shower and bathtub. Outside, you'll find a spacious deck area that offers stunning views of the ocean and is the perfect spot for relaxing or dining al fresco. The deck is equipped with comfortable outdoor furniture, including a dining table and chairs, loungers, and a BBQ. With direct access to the beach, you can spend your days swimming, surfing, or simply relaxing on the sandy shores. And if you want to explore the local area, there are plenty of attractions, including restaurants, cafes, and shops, all within easy reach. Book your stay at our beautiful beachfront house today and experience the ultimate California coastal getaway.`,
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Roselands",
        description:`
        Welcome to our beautiful coastal home, located in the picturesque town of Cannon Beach, Oregon. This stunning property boasts a prime location just steps away from the sandy beach, offering breathtaking ocean views and easy access to all the seaside fun. As you step inside, you'll be greeted by a bright and airy living space with large windows that flood the room with natural light. The open-plan layout creates a seamless flow between the living, dining, and kitchen areas, making it perfect for entertaining or spending quality time with family and friends. The living area is beautifully furnished with comfortable seating and stylish decor, providing the perfect spot to relax and unwind after a day spent exploring the beach. The dining area features a large wooden table and seating for up to six people, making it ideal for enjoying a family meal together. The fully equipped kitchen boasts high-end appliances and everything you need to prepare a delicious meal, including a gas range, stainless steel appliances, and plenty of counter space. This gorgeous home features two bedrooms, both with comfortable beds and plenty of storage space. The master bedroom boasts a king-size bed and breathtaking ocean views, while the second bedroom features a queen-size bed and a cozy, welcoming atmosphere. Outside, you'll find a spacious deck with comfortable seating, perfect for enjoying the fresh ocean breeze and stunning views of the Pacific. The deck is also equipped with a grill, making it easy to cook up a delicious meal while taking in the beauty of the Oregon coast. Book your stay at this beautiful Cannon Beach home today and experience the best of coastal living in Oregon.`,
        price: 200
      },


    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
