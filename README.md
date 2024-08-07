Игра состоит из игрового поля произвольного размера N*M. В каждой ячейке поля находится игровой объект (далее именуемый тайл) определенного цвета. Количество возможных вариантов цветов равно C. 
Начальное состояние поля задается случайно (вероятность цвета тайла является равновероятной). При клике на тайл сжигается (удаляется) область, состоящая из группы прилегающих тайлов того же цвета, размер группы не может быть меньше чем K (по умолчанию K=2). На месте удаленных должны образоваться пустые места.
Далее происходит перемещение тайлов на пустые места сверху вниз. Если верхняя ячейка становится пустой, необходимо сгенерировать новый тайл и переместить его в эту ячейку. Процесс перемещения и добавление новых тайлов должен быть непрерывный и происходит до тех пор, пока поле снова не будет полностью заполнено.
На заполненном поле всегда можно сжечь тайлы. Если такой возможности нет, то необходимо перемешать тайлы на поле (количество перемешиваний S). Если же после перемешивания нет возможности сжечь тайлы, то такая ситуация является проигрышем для игрока.
	Цель игры – набрать X очков за Y ходов, иначе проигрыш. Значение количества очков и ходов для выигрыша, а также формула начисления очков остается на усмотрение соискателя.

Перед выполнением тестового задания советуем ознакомится со списком игр с механикой “Blast” (см. ниже) для лучшего понимания игрового процесса.

Основное задание:
Выполнить реализацию на JavaScript + Canvas
Допустимо использование следующих фреймворков и игровых движков: Pixi.js / Phaser.js / Cocos2d JS / CocosCreator
Недопустимо использование React.js, Vue.js и другие производные фреймворки для работы с DOM
Недопустимо использование физических движков (например Box2D, Phaser.Physics и т.д.) для перемещения тайлов
Использовать при разработке принципы SOLID
Отделить логику игры и отображение
Разбить игру на отдельные состояния (сцены)
Реализовать анимации для перемещения и сжигания тайлов
Отображение количества оставшихся ходов и набранных очков
Обработать состояние выигрыша или проигрыша
Использовать приложенный набор ассетов (см. ниже)
Исходники выложить на github.com / gitlab.com / bitbucket.com
Предоставить ссылку на рабочий проект на общедоступном хостинге (например https://pages.github.com или подобные)
