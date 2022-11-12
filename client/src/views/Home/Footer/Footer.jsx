import React from 'react'

const Footer = () => {
  return (
	<footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline">CellWorld™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="mr-4 hover:underline md:mr-6 ">Support</a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="mr-4 hover:underline md:mr-6">Acerca de nosotros</a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="mr-4 hover:underline md:mr-6">Redes sociales</a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="hover:underline">Contact</a>
          </li>
        </ul>
      </footer>
  )
}

export default Footer