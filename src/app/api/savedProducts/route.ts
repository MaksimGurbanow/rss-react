'use server';

import { NextRequest, NextResponse } from 'next/server';
import getProductById from '../../../api/getProductById';
import { products } from './data';

export async function GET() {
  return NextResponse.json({ products });
}

export async function PUT(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  const newItem = await getProductById(id);

  products.push(newItem);

  return NextResponse.json({ product: newItem });
}

export async function DELETE(req: NextRequest) {
  const { ids }: { ids: number[] } = await req.json();
  const deletedItems = [];
  for (const id of ids) {
    const index = products.findIndex((product) => product.id === id);
    deletedItems.push(products.splice(index, 1));
  }
  if (!deletedItems.length)
    return NextResponse.json(
      { error: 'The items with provided ids were not found' },
      { status: 404 },
    );
  return NextResponse.json({ products: deletedItems });
}
