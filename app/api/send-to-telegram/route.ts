import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, mode, weight, kilometers, price } = body;

    // Проверяем наличие обязательных полей
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Получаем токен бота и chat_id из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID; // Основной чат
    const chatId2 = process.env.TELEGRAM_CHAT_ID_2; // Дополнительный чат для дублирования

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены');
      return NextResponse.json(
        { error: 'Сервер не настроен для отправки сообщений' },
        { status: 500 }
      );
    }

    // Маппинг значений для читаемого формата
    const modeMap: Record<string, string> = {
      city: 'По городу',
      intercity: 'Межгород',
    };

    const weightMap: Record<string, string> = {
      upTo2: 'До 2 тонн',
      over2: 'Свыше 2 тонн',
      '3t': '3 тонны',
      from3_5: 'От 3,5 тонн',
      from4: 'От 4 тонн',
      over5: 'Больше 5 тонн',
    };

    // Формируем сообщение для Telegram
    let message = `
🚗 *Новая заявка на эвакуатор*

👤 *Контактные данные:*
Имя: ${name}
Телефон: ${phone}`;

    if (address && address.trim()) {
      message += `\nАдрес забора: ${address.trim()}`;
    }

    message += `\n\n🚙 *Параметры заказа:*
Режим: ${modeMap[mode] || mode}
Вес машины: ${weightMap[weight] || weight}`;

    if (mode === 'intercity' && kilometers) {
      message += `\nРасстояние: ${parseFloat(kilometers).toLocaleString('ru-RU')} км`;
    }

    message += `\n\n💰 *Стоимость:* ${price.toLocaleString('ru-RU')} ₽`;
    message = message.trim();

    // Функция для отправки сообщения в Telegram
    const sendToTelegram = async (targetChatId: string) => {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: targetChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Ошибка отправки в Telegram чат ${targetChatId}:`, errorData);
        throw new Error(`Не удалось отправить в чат ${targetChatId}`);
      }

      return response.json();
    };

    // Отправляем в основной чат (обязательно)
    try {
      await sendToTelegram(chatId);
    } catch (error) {
      console.error('Ошибка отправки в основной чат:', error);
      return NextResponse.json(
        { error: 'Не удалось отправить заявку' },
        { status: 500 }
      );
    }

    // Отправляем в дополнительный чат для дублирования (если указан)
    if (chatId2) {
      try {
        await sendToTelegram(chatId2);
      } catch (error) {
        // Не критично, если не удалось отправить в дополнительный чат
        console.warn('Не удалось отправить в дополнительный чат:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}

