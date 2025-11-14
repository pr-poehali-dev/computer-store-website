import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  ram: number;
  cpu: string;
  gpu: string;
}

const products: Product[] = [
  { id: 1, name: 'Gaming PC Ultra', price: 120000, image: 'https://cdn.poehali.dev/projects/4c5f2828-3ec4-432e-ae03-103453e024f8/files/94300936-a14c-49ec-9ed3-2a1d262c0d6c.jpg', category: 'Компьютеры', ram: 32, cpu: 'Intel i9', gpu: 'RTX 4090' },
  { id: 2, name: 'Office Pro', price: 45000, image: 'https://cdn.poehali.dev/projects/4c5f2828-3ec4-432e-ae03-103453e024f8/files/d2cd44c9-429b-4e21-ae86-afdacb6dd484.jpg', category: 'Компьютеры', ram: 16, cpu: 'Intel i5', gpu: 'Integrated' },
  { id: 3, name: 'Gaming Laptop', price: 85000, image: 'https://cdn.poehali.dev/projects/4c5f2828-3ec4-432e-ae03-103453e024f8/files/9900e0ad-6227-4ae1-8ec5-36701e759176.jpg', category: 'Ноутбуки', ram: 16, cpu: 'AMD Ryzen 7', gpu: 'RTX 4060' },
  { id: 4, name: 'UltraWide Monitor', price: 35000, image: '/placeholder.svg', category: 'Мониторы', ram: 0, cpu: 'N/A', gpu: 'N/A' },
  { id: 5, name: 'Mechanical Keyboard', price: 8500, image: '/placeholder.svg', category: 'Периферия', ram: 0, cpu: 'N/A', gpu: 'N/A' },
  { id: 6, name: 'Workstation Pro', price: 95000, image: 'https://cdn.poehali.dev/projects/4c5f2828-3ec4-432e-ae03-103453e024f8/files/94300936-a14c-49ec-9ed3-2a1d262c0d6c.jpg', category: 'Компьютеры', ram: 64, cpu: 'Intel Xeon', gpu: 'RTX A4000' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedRAM, setSelectedRAM] = useState<number[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<string[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = products.filter(product => {
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedRAM.length > 0 && product.ram > 0 && !selectedRAM.includes(product.ram)) return false;
    if (selectedCPU.length > 0 && product.cpu !== 'N/A' && !selectedCPU.some(cpu => product.cpu.includes(cpu))) return false;
    return true;
  });

  const ramOptions = [8, 16, 32, 64];
  const cpuOptions = ['Intel i5', 'Intel i9', 'AMD Ryzen', 'Intel Xeon'];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Monitor" size={32} />
              <h1 className="text-2xl font-bold">TechStore</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('home')} className={`hover:text-white transition-colors ${activeSection === 'home' ? 'font-bold' : ''}`}>
                Главная
              </button>
              <button onClick={() => setActiveSection('catalog')} className={`hover:text-white transition-colors ${activeSection === 'catalog' ? 'font-bold' : ''}`}>
                Каталог
              </button>
              <button onClick={() => setActiveSection('about')} className={`hover:text-white transition-colors ${activeSection === 'about' ? 'font-bold' : ''}`}>
                О магазине
              </button>
              <button onClick={() => setActiveSection('contacts')} className={`hover:text-white transition-colors ${activeSection === 'contacts' ? 'font-bold' : ''}`}>
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative bg-white text-primary hover:bg-gray-100">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-white">{cart.length}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{cartTotal.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="fade-in">
            <section className="text-center py-16 mb-12">
              <h2 className="text-5xl font-bold mb-4">Компьютеры и комплектующие</h2>
              <p className="text-xl text-muted-foreground mb-8">Лучшие цены на технику для работы и игр</p>
              <Button size="lg" onClick={() => setActiveSection('catalog')}>
                Перейти в каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <Card key={product.id} className="hover-scale">
                    <CardHeader>
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-2">{product.name}</CardTitle>
                      <Badge variant="secondary">{product.category}</Badge>
                      <p className="text-2xl font-bold text-primary mt-4">{product.price.toLocaleString()} ₽</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-8">Каталог товаров</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Фильтры</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="font-medium mb-3 block">Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽</label>
                      <Slider
                        min={0}
                        max={150000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="font-medium mb-3 block">Оперативная память (ГБ)</label>
                      <div className="space-y-2">
                        {ramOptions.map(ram => (
                          <div key={ram} className="flex items-center gap-2">
                            <Checkbox
                              id={`ram-${ram}`}
                              checked={selectedRAM.includes(ram)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedRAM([...selectedRAM, ram]);
                                } else {
                                  setSelectedRAM(selectedRAM.filter(r => r !== ram));
                                }
                              }}
                            />
                            <label htmlFor={`ram-${ram}`} className="cursor-pointer">{ram} ГБ</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-medium mb-3 block">Процессор</label>
                      <div className="space-y-2">
                        {cpuOptions.map(cpu => (
                          <div key={cpu} className="flex items-center gap-2">
                            <Checkbox
                              id={`cpu-${cpu}`}
                              checked={selectedCPU.includes(cpu)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCPU([...selectedCPU, cpu]);
                                } else {
                                  setSelectedCPU(selectedCPU.filter(c => c !== cpu));
                                }
                              }}
                            />
                            <label htmlFor={`cpu-${cpu}`} className="cursor-pointer">{cpu}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={() => {
                      setPriceRange([0, 150000]);
                      setSelectedRAM([]);
                      setSelectedCPU([]);
                    }}>
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>
              </aside>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="hover-scale">
                      <CardHeader>
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="mb-2">{product.name}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                        {product.ram > 0 && (
                          <div className="text-sm text-muted-foreground space-y-1 mt-2">
                            <p>RAM: {product.ram} ГБ</p>
                            <p>CPU: {product.cpu}</p>
                            <p>GPU: {product.gpu}</p>
                          </div>
                        )}
                        <p className="text-2xl font-bold text-primary mt-4">{product.price.toLocaleString()} ₽</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-xl text-muted-foreground">Товары не найдены</p>
                    <Button variant="outline" className="mt-4" onClick={() => {
                      setPriceRange([0, 150000]);
                      setSelectedRAM([]);
                      setSelectedCPU([]);
                    }}>
                      Сбросить фильтры
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">О магазине</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-lg">
                  TechStore — ваш надёжный партнёр в мире компьютерной техники. Мы предлагаем широкий ассортимент компьютеров, ноутбуков, комплектующих и периферии от ведущих производителей.
                </p>
                <p className="text-lg">
                  Наша команда экспертов поможет подобрать оптимальное решение для любых задач — от офисной работы до профессионального гейминга и видеомонтажа.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4">
                    <Icon name="Award" size={48} className="mx-auto mb-2 text-primary" />
                    <h3 className="font-bold mb-2">Качество</h3>
                    <p className="text-sm text-muted-foreground">Только оригинальная техника</p>
                  </div>
                  <div className="text-center p-4">
                    <Icon name="Truck" size={48} className="mx-auto mb-2 text-primary" />
                    <h3 className="font-bold mb-2">Доставка</h3>
                    <p className="text-sm text-muted-foreground">Быстрая доставка по РФ</p>
                  </div>
                  <div className="text-center p-4">
                    <Icon name="Shield" size={48} className="mx-auto mb-2 text-primary" />
                    <h3 className="font-bold mb-2">Гарантия</h3>
                    <p className="text-sm text-muted-foreground">Официальная гарантия</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="fade-in max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Контакты</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Технологическая, д. 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@techstore.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TechStore. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}