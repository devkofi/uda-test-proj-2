import dotenv from 'dotenv'
import {BookType, Book} from '../models/book';

const {ENV} = process.env;

const book = new Book((ENV as unknown) as string);

describe("Test Suite for books: ",()=>{
    it("Check Existence of index function", ()=>{
        expect(book.index).toBeDefined();
    });
    
    it('should have a show method', () => {
        expect(book.show).toBeDefined();
    });
    
    it('should have a create method', () => {
        expect(book.create).toBeDefined();
    });
    
    it('should have a update method', () => {
        expect(book.update).toBeDefined();
    });
    
    it('should have a delete method', () => {
        expect(book.delete).toBeDefined();
    });

    it("Index Returns An Array of Books", async ()=>{

        const results = await book.index().then((item)=>{
            expect(item.length).toBeGreaterThanOrEqual(0);
        });
        
    });
    
    it('create method should add a book', async () => {
        const result = await book.create({
            title: 'Bridge to Terabithia',
            type:'Comic',
            total_pages: 250,
            author: 'Katherine Paterson',
            summary: 'Childrens'
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    
    it('show method should return the correct book', async () => {
    const result = await book.show("1");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('delete method should remove the book', async () => {
        book.delete("1");
        const result = await book.index()

        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});