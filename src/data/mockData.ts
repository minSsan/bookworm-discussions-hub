
import { Book, Discussion, User, Chapter } from '../types';

export const mockChapters: Chapter[] = [
  // 클린 아키텍처 챕터들
  { id: '1-1', title: '1장. 설계와 아키텍처란?', bookId: '1' },
  { id: '1-2', title: '2장. 두 가지 가치에 대한 이야기', bookId: '1' },
  { id: '1-3', title: '3장. 패러다임 개요', bookId: '1' },
  { id: '1-4', title: '4장. 구조적 프로그래밍', bookId: '1' },
  { id: '1-5', title: '5장. 객체지향 프로그래밍', bookId: '1' },
  
  // 리팩토링 2판 챕터들
  { id: '2-1', title: '1장. 리팩토링: 첫 번째 예시', bookId: '2' },
  { id: '2-2', title: '2장. 리팩토링 원칙', bookId: '2' },
  { id: '2-3', title: '3장. 코드에서 나는 악취', bookId: '2' },
  { id: '2-4', title: '4장. 테스트 구축하기', bookId: '2' },
  
  // 모던 자바스크립트 Deep Dive 챕터들
  { id: '3-1', title: '1장. 프로그래밍', bookId: '3' },
  { id: '3-2', title: '2장. 자바스크립트란?', bookId: '3' },
  { id: '3-3', title: '3장. 자바스크립트 개발 환경과 실행 방법', bookId: '3' },
  { id: '3-4', title: '4장. 변수', bookId: '3' },
  { id: '3-5', title: '5장. 표현식과 문', bookId: '3' },
];

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '클린 아키텍처',
    author: '로버트 C. 마틴',
    description: '소프트웨어 구조와 설계의 원칙을 다루는 필수 도서',
    coverImage: 'https://image.yes24.com/goods/77283734/XL',
    publishYear: 2017,
    categories: ['아키텍처', '설계'],
    prices: [
      { id: '1', price: 25000, condition: 'new', sellerId: '1', sellerName: '김영희' },
      { id: '2', price: 20000, condition: 'like-new', sellerId: '2', sellerName: '박철수' },
      { id: '3', price: 18000, condition: 'good', sellerId: '3', sellerName: '이민수' },
    ],
    purchased: false,
    likes: 15,
    chapters: mockChapters.filter(c => c.bookId === '1')
  },
  {
    id: '2',
    title: '리팩토링 2판',
    author: '마틴 파울러',
    description: '코드 구조를 체계적으로 개선하는 기법과 패턴',
    coverImage: 'https://image.yes24.com/goods/89649360/XL',
    publishYear: 2019,
    categories: ['리팩토링', '코드품질'],
    prices: [
      { id: '4', price: 32000, condition: 'new', sellerId: '4', sellerName: '정민영' },
      { id: '5', price: 28000, condition: 'like-new', sellerId: '5', sellerName: '홍길동' },
    ],
    purchased: true,
    likes: 22,
    chapters: mockChapters.filter(c => c.bookId === '2')
  },
  {
    id: '3',
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    description: 'JavaScript의 핵심 개념과 동작 원리를 깊이 있게 다루는 책',
    coverImage: 'https://image.yes24.com/goods/92742567/XL',
    publishYear: 2020,
    categories: ['JavaScript', '프론트엔드', '백엔드'],
    prices: [
      { id: '6', price: 35000, condition: 'new', sellerId: '6', sellerName: '김개발' },
      { id: '7', price: 30000, condition: 'like-new', sellerId: '7', sellerName: '이코딩' },
      { id: '8', price: 25000, condition: 'good', sellerId: '8', sellerName: '박자바' },
    ],
    purchased: false,
    likes: 18,
    chapters: mockChapters.filter(c => c.bookId === '3')
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    bookId: '1',
    chapterId: '1-5',
    title: '의존성 역전 원칙이 실제 프로젝트에서 어떻게 적용될까요?',
    content: '클린 아키텍처를 읽으면서 의존성 역전 원칙에 대해 이해는 했지만, 실제 프로젝트에서는 어떻게 적용해야 할지 막막합니다. 특히 Spring Boot 프로젝트에서의 구체적인 예시가 궁금합니다.',
    author: '김철수',
    authorId: '1',
    createdAt: new Date('2024-01-15'),
    likes: 8,
    comments: []
  },
  {
    id: '2',
    bookId: '2',
    chapterId: '2-4',
    title: '리팩토링할 때 테스트 코드 작성 순서',
    content: '리팩토링을 할 때 기존 코드에 테스트가 없는 경우, 테스트 코드를 먼저 작성하고 리팩토링을 해야 할까요? 아니면 리팩토링을 하면서 동시에 테스트를 작성해도 될까요?',
    author: '김민수',
    authorId: '2',
    createdAt: new Date('2024-01-14'),
    likes: 12,
    comments: []
  },
  {
    id: '3',
    bookId: '3',
    chapterId: '3-5',
    title: '호이스팅과 클로저의 관계',
    content: '자바스크립트의 호이스팅과 클로저 개념을 각각은 이해했는데, 이 둘이 어떻게 연관되어 있는지 궁금합니다. 실제 코드 예시와 함께 설명해주실 수 있나요?',
    author: '이개발',
    authorId: '3',
    createdAt: new Date('2024-01-13'),
    likes: 15,
    comments: []
  }
];

export const mockUser: User = {
  id: '1',
  name: '김철수',
  email: 'kimcs@example.com',
  purchasedBooks: ['2']
};
