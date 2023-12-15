import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('class')
@ApiTags('class')
export class ClassController {}
