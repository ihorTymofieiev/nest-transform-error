import {IsBoolean, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';

export class BrokenQueryDto {
    @IsOptional()
    @Transform(value => {
        // this method called twice
        // first with data is raw
        // second with transformed data
        return value === true.toString();
    })
    @IsBoolean()
    @ApiProperty({ required: false, type: Number, default: 'false', enum: ['false', 'true'] })
    includeAllRelations: boolean = false;
}
