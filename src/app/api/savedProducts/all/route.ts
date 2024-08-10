import { NextResponse } from 'next/server';
import { products } from '../data';

export async function DELETE() {
  while (products.length) products.pop();

  return NextResponse.json({ products });
}
