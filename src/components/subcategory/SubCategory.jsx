import { Link } from 'react-router-dom';

function SubCategory({ subcategories = [] }) {
  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <div className="subcategory-section">
      <div className="subcategory-list">
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            to={`/engagement-rings/${subcategory.slug}`}
            className="subcategory-item"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubCategory;

