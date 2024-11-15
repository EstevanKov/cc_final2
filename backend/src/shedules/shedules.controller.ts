import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards  } from '@nestjs/common';
import { ShedulesService } from './shedules.service';
import { newShed, updatShed } from './shedelus.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('shedules')
export class ShedulesController {
    constructor(private readonly shedulesService: ShedulesService) {}

    @Post()
    create(@Body() newShed: newShed) {
        return this.shedulesService.createS(newShed);
    }

    @Get()
    findAll() {
        return this.shedulesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.shedulesService.findShedules(id);
    }

    // @Patch(':id')
    // update(@Param('id', ParseIntPipe) id: number, @Body() updateShed: updatShed) {
    //     return this.shedulesService(id, updateShed);
    // }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.shedulesService.deleteS(id);
    }
}