
import { Book, Discussion, User } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '클린 아키텍처',
    author: '로버트 C. 마틴',
    description: '소프트웨어 구조와 설계의 원칙을 다루는 필수 도서',
    coverImage: '/placeholder.svg',
    publishYear: 2017,
    categories: ['아키텍처', '설계'],
    prices: [
      { id: '1', price: 25000, condition: 'new', sellerId: '1', sellerName: '김영희' },
      { id: '2', price: 20000, condition: 'like-new', sellerId: '2', sellerName: '박철수' },
      { id: '3', price: 18000, condition: 'good', sellerId: '3', sellerName: '이민수' },
    ],
    purchased: false,
    likes: 15
  },
  {
    id: '2',
    title: '리팩토링 2판',
    author: '마틴 파울러',
    description: '코드 구조를 체계적으로 개선하는 기법과 패턴',
    coverImage: '/placeholder.svg',
    publishYear: 2019,
    categories: ['리팩토링', '코드품질'],
    prices: [
      { id: '4', price: 32000, condition: 'new', sellerId: '4', sellerName: '정민영' },
      { id: '5', price: 28000, condition: 'like-new', sellerId: '5', sellerName: '홍길동' },
    ],
    purchased: true,
    likes: 22
  },
  {
    id: '3',
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    description: 'JavaScript의 핵심 개념과 동작 원리를 깊이 있게 다루는 책',
    coverImage: '/placeholder.svg',
    publishYear: 2020,
    categories: ['JavaScript', '프론트엔드', '백엔드'],
    prices: [
      { id: '6', price: 35000, condition: 'new', sellerId: '6', sellerName: '김개발' },
      { id: '7', price: 30000, condition: 'like-new', sellerId: '7', sellerName: '이코딩' },
      { id: '8', price: 25000, condition: 'good', sellerId: '8', sellerName: '박자바' },
    ],
    purchased: false,
    likes: 18
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    bookId: '1',
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
