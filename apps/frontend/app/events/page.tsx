import React, {Suspense} from 'react'
import CategoriesSlidder from '../_components/categoriesSlidder';
import Loading from './loadinng';
import Events from '../_components/events';

const eventsPage:React.FC = () => {
  
  return (
    <section className=''> 
      <CategoriesSlidder />
      <Suspense fallback={<Loading />}>
        <Events/>
      </Suspense>
    </section>
  )
}

export default eventsPage;