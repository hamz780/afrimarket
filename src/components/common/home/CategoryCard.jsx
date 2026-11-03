import React from 'react';

function CategoryCard({ category }) {
  return (
    <div className="category-card" style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>
        {category.icon || '📦'}
      </div>
      <h3 style={{ margin: '10px 0 5px 0', color: '#333' }}>
        {category.name}
      </h3>
      <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
        {category.description || 'Explore our collection'}
      </p>
      <span style={{
        display: 'inline-block',
        background: '#e8f5e9',
        color: '#2e7d32',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        marginTop: '10px'
      }}>
        {category.productCount || 0} products
      </span>
    </div>
  );
}

export default CategoryCard;  // ← IMPORTANT: Default export